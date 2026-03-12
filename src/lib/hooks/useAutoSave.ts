"use client";

import { useCallback, useRef } from "react";
import type { SaveStatus, CompassAnswers } from "@/types/compass";
import { updateSession } from "@/lib/storage";

interface UseAutoSaveOptions {
  sessionId: string;
  onStatusChange: (status: SaveStatus) => void;
}

export function useAutoSave({ sessionId, onStatusChange }: UseAutoSaveOptions) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveAnswers = useCallback(
    (answers: CompassAnswers) => {
      onStatusChange("saving");
      try {
        updateSession(sessionId, { answers });
        onStatusChange("saved");
        setTimeout(() => onStatusChange("idle"), 2000);
      } catch {
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
    (currentScreen: number) => {
      try {
        updateSession(sessionId, { currentScreen });
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
