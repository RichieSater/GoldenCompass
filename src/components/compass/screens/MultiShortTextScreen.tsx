"use client";

import Input from "@/components/ui/Input";
import type { CompassScreen } from "@/types/compass";

interface MultiShortTextScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function MultiShortTextScreen({
  screen,
  answers,
  onAnswerChange,
}: MultiShortTextScreenProps) {
  const inputs = screen.inputs || [];

  return (
    <div className="flex w-full flex-col gap-4">
      {inputs.map((input, i) => (
        <Input
          key={input.key}
          label={input.label}
          value={answers[input.key] || ""}
          onChange={(e) => onAnswerChange(input.key, e.target.value)}
          placeholder={input.placeholder}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}
