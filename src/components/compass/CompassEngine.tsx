"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { COMPASS_FLOW, getAllScreens } from "@/lib/compass-flow";
import type {
  CompassAnswers,
  NavigationDirection,
  SaveStatus,
} from "@/types/compass";
import { useKeyboardNav } from "@/lib/hooks/useKeyboardNav";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import ScreenRenderer from "./ScreenRenderer";
import ScreenTransition from "./ScreenTransition";
import ProgressIndicator from "./ProgressIndicator";
import NavigationControls from "./NavigationControls";

interface CompassEngineProps {
  sessionId: string;
  initialScreen: number;
  initialAnswers: CompassAnswers;
}

export default function CompassEngine({
  sessionId,
  initialScreen,
  initialAnswers,
}: CompassEngineProps) {
  const router = useRouter();
  const allScreens = useMemo(() => getAllScreens(), []);
  const totalScreens = allScreens.length;

  const [currentIndex, setCurrentIndex] = useState(
    Math.min(initialScreen, totalScreens - 1)
  );
  const [answers, setAnswers] = useState<CompassAnswers>(initialAnswers);
  const [direction, setDirection] = useState<NavigationDirection>("forward");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const screen = allScreens[currentIndex];

  // Auto-save hook
  const { debouncedSave, savePosition, flushSave } = useAutoSave({
    sessionId,
    onStatusChange: setSaveStatus,
  });

  // Prefill logic: if a screen has prefillFrom, copy from that screen's answers
  const screenAnswers = useMemo(() => {
    const current = answers[screen.id] || {};
    if (screen.prefillFrom && Object.keys(current).length === 0) {
      const source = answers[screen.prefillFrom];
      if (source) {
        // For "top-3-goals" → textarea "main", compose from goal1/goal2/goal3
        const values = Object.values(source).filter(Boolean);
        if (values.length > 0) {
          return { main: values.join("\n") };
        }
      }
    }
    return current;
  }, [answers, screen.id, screen.prefillFrom]);

  // Determine if can proceed
  const canProceed = useMemo(() => {
    const type = screen.type;

    // Interstitial & animation screens are always passable
    if (type === "interstitial" || type === "animation") return true;

    // Checklist: must have all items checked if requireAllChecked
    if (type === "checklist" && screen.requireAllChecked) {
      return (screen.checklistItems || []).every(
        (item) => screenAnswers[item.key] === "true"
      );
    }

    // Not required screens can always proceed
    if (!screen.isRequired) return true;

    // Textarea, short-text: check "main" key
    if (type === "textarea" || type === "short-text") {
      return (screenAnswers.main || "").trim().length > 0;
    }

    // Multi-short-text, multi-textarea: check all input keys
    if (type === "multi-short-text" || type === "multi-textarea") {
      return (screen.inputs || []).every(
        (input) => (screenAnswers[input.key] || "").trim().length > 0
      );
    }

    // Multi-input: check "items" key has at least one item
    if (type === "multi-input") {
      try {
        const items = JSON.parse(screenAnswers.items || "[]");
        return Array.isArray(items) && items.length > 0;
      } catch {
        return false;
      }
    }

    // Signature: check "name" and "signature"
    if (type === "signature") {
      return (
        (screenAnswers.name || "").trim().length > 0 &&
        (screenAnswers.signature || "").length > 0
      );
    }

    // Ritual: check forgiveness count
    if (type === "ritual") {
      return true; // Ritual handles its own internal completion
    }

    return true;
  }, [screen, screenAnswers]);

  // Handle answer changes
  const handleAnswerChange = useCallback(
    (key: string, value: string) => {
      setAnswers((prev) => {
        const updated = {
          ...prev,
          [screen.id]: {
            ...(prev[screen.id] || {}),
            [key]: value,
          },
        };
        debouncedSave(updated);
        return updated;
      });
    },
    [screen.id, debouncedSave]
  );

  // Navigation
  const goNext = useCallback(() => {
    if (!canProceed) return;

    if (currentIndex >= totalScreens - 1) {
      // Complete the session
      flushSave(answers);
      fetch(`/api/compass/${sessionId}/complete`, { method: "POST" }).then(
        () => {
          router.push("/dashboard");
        }
      );
      return;
    }

    const nextIndex = currentIndex + 1;
    setDirection("forward");
    setCurrentIndex(nextIndex);
    savePosition(nextIndex);
  }, [
    canProceed,
    currentIndex,
    totalScreens,
    answers,
    sessionId,
    flushSave,
    savePosition,
    router,
  ]);

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    setDirection("backward");
    setCurrentIndex(prevIndex);
    savePosition(prevIndex);
  }, [currentIndex, savePosition]);

  const saveAndExit = useCallback(() => {
    flushSave(answers);
    savePosition(currentIndex);
    router.push("/dashboard");
  }, [answers, currentIndex, flushSave, savePosition, router]);

  // Determine if current screen type should suppress Enter-to-advance
  // (textareas need Enter for newlines, multi-input needs Enter to add items)
  const isTextInput =
    screen.type === "textarea" ||
    screen.type === "multi-textarea" ||
    screen.type === "multi-input";

  // Keyboard navigation
  useKeyboardNav({
    onNext: goNext,
    onBack: goBack,
    canProceed,
    isTextInput,
  });

  // Progress calculation
  const section = COMPASS_FLOW.find((s) => s.key === screen.sectionKey);
  const progress = (currentIndex + 1) / totalScreens;

  return (
    <div className="flex h-dvh flex-col bg-deep-black">
      <ProgressIndicator
        sectionTitle={section?.title || ""}
        progress={progress}
        saveStatus={saveStatus}
        currentScreen={currentIndex}
        totalScreens={totalScreens}
      />

      <ScreenTransition direction={direction} screenKey={screen.id}>
        <ScreenRenderer
          screen={screen}
          answers={screenAnswers}
          allAnswers={answers}
          onAnswerChange={handleAnswerChange}
        />
      </ScreenTransition>

      <NavigationControls
        onBack={goBack}
        onNext={goNext}
        canProceed={canProceed}
        isFirst={currentIndex === 0}
        isLast={currentIndex === totalScreens - 1}
        screenType={screen.type}
        onSaveAndExit={saveAndExit}
      />
    </div>
  );
}
