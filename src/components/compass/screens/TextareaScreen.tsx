"use client";

import Textarea from "@/components/ui/Textarea";
import type { CompassScreen } from "@/types/compass";

interface TextareaScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function TextareaScreen({
  screen,
  answers,
  onAnswerChange,
}: TextareaScreenProps) {
  return (
    <Textarea
      value={answers.main || ""}
      onChange={(e) => onAnswerChange("main", e.target.value)}
      placeholder={screen.placeholder}
      autoFocus
    />
  );
}
