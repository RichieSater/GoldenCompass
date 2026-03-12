"use client";

import Input from "@/components/ui/Input";
import type { CompassScreen } from "@/types/compass";

interface ShortTextScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function ShortTextScreen({
  screen,
  answers,
  onAnswerChange,
}: ShortTextScreenProps) {
  return (
    <Input
      value={answers.main || ""}
      onChange={(e) => onAnswerChange("main", e.target.value)}
      placeholder={screen.placeholder}
      autoFocus
    />
  );
}
