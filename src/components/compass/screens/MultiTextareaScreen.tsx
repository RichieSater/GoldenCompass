"use client";

import Textarea from "@/components/ui/Textarea";
import type { CompassScreen } from "@/types/compass";

interface MultiTextareaScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function MultiTextareaScreen({
  screen,
  answers,
  onAnswerChange,
}: MultiTextareaScreenProps) {
  const inputs = screen.inputs || [];

  return (
    <div className="flex w-full flex-col gap-6">
      {inputs.map((input, i) => (
        <Textarea
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
