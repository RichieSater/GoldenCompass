"use client";

import { useCallback, useRef } from "react";
import type { SaveStatus, CompassAnswers } from "@/types/compass";

interface UseAutoSaveOptions {
  sessionId: string;
  onStatusChange: (status: SaveStatus) => void;
}

export function useAutoSave({ sessionId, onStatusChange }: UseAutoSaveOptions) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const saveAnswers = useCallback(
    async (answers: CompassAnswers) => {
      // Flatten CompassAnswers into array of { screenId, inputKey, answer }
      const entries: { screenId: string; inputKey: string; answer: string }[] =
        [];
      for (const [screenId, inputs] of Object.entries(answers)) {
        for (const [inputKey, answer] of Object.entries(inputs)) {
          if (answer) {
            entries.push({ screenId, inputKey, answer });
          }
        }
      }

      if (entries.length === 0) return;

      // Cancel any in-flight request
      abortController.current?.abort();
      abortController.current = new AbortController();

      onStatusChange("saving");

      try {
        const res = await fetch(`/api/compass/${sessionId}/answers`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: entries }),
          signal: abortController.current.signal,
        });

        if (!res.ok) throw new Error("Save failed");
        onStatusChange("saved");

        // Reset to idle after 2 seconds
        setTimeout(() => onStatusChange("idle"), 2000);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        onStatusChange("error");
        setTimeout(() => onStatusChange("idle"), 3000);
      }
    },
    [sessionId, onStatusChange]
  );

  const debouncedSave = useCallback(
    (answers: CompassAnswers) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => saveAnswers(answers), 1500);
    },
    [saveAnswers]
  );

  const savePosition = useCallback(
    async (currentScreen: number) => {
      try {
        await fetch(`/api/compass/${sessionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentScreen }),
        });
      } catch {
        // Position save is best-effort
      }
    },
    [sessionId]
  );

  const flushSave = useCallback(
    (answers: CompassAnswers) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      saveAnswers(answers);
    },
    [saveAnswers]
  );

  return { debouncedSave, savePosition, flushSave };
}
