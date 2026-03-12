"use client";

import { useEffect } from "react";

interface UseKeyboardNavOptions {
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  isTextInput: boolean;
}

export function useKeyboardNav({
  onNext,
  onBack,
  canProceed,
  isTextInput,
}: UseKeyboardNavOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept Enter on textareas (allow newlines)
      if (e.key === "Enter" && !e.shiftKey && !isTextInput && canProceed) {
        e.preventDefault();
        onNext();
        return;
      }

      // Cmd/Ctrl + Enter always advances (even in textareas)
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canProceed) {
        e.preventDefault();
        onNext();
        return;
      }

      // Escape or left arrow goes back (only when not focused on inputs)
      const active = document.activeElement;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active instanceof HTMLCanvasElement;

      if (e.key === "Escape" && !isInput) {
        e.preventDefault();
        onBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onBack, canProceed, isTextInput]);
}
