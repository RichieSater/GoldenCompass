"use client";

import type { CompassScreen } from "@/types/compass";
import ScreenShell from "./ScreenShell";
import InterstitialScreen from "./screens/InterstitialScreen";
import TextareaScreen from "./screens/TextareaScreen";
import ShortTextScreen from "./screens/ShortTextScreen";
import MultiShortTextScreen from "./screens/MultiShortTextScreen";
import MultiTextareaScreen from "./screens/MultiTextareaScreen";
import ChecklistScreen from "./screens/ChecklistScreen";
import MultiInputScreen from "./screens/MultiInputScreen";
import RitualScreen from "./screens/RitualScreen";
import SignatureScreen from "./screens/SignatureScreen";
import AnimationScreen from "./screens/AnimationScreen";

interface ScreenRendererProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  allAnswers: Record<string, Record<string, string>>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function ScreenRenderer({
  screen,
  answers,
  allAnswers,
  onAnswerChange,
}: ScreenRendererProps) {
  function renderScreenContent() {
    switch (screen.type) {
      case "interstitial":
        return <InterstitialScreen />;
      case "textarea":
        return (
          <TextareaScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "short-text":
        return (
          <ShortTextScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "multi-short-text":
        return (
          <MultiShortTextScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "multi-textarea":
        return (
          <MultiTextareaScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "checklist":
        return (
          <ChecklistScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "multi-input":
        return (
          <MultiInputScreen
            screen={screen}
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "ritual":
        return (
          <RitualScreen
            answers={answers}
            allAnswers={allAnswers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "signature":
        return (
          <SignatureScreen
            answers={answers}
            onAnswerChange={onAnswerChange}
          />
        );
      case "animation":
        return (
          <AnimationScreen
            animation={screen.animation ?? null}
            allAnswers={allAnswers}
          />
        );
      default:
        return null;
    }
  }

  return (
    <ScreenShell
      headline={screen.headline}
      narrativeText={screen.narrativeText}
      questionText={screen.questionText}
    >
      {renderScreenContent()}
    </ScreenShell>
  );
}
