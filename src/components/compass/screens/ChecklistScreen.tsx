"use client";

import Checkbox from "@/components/ui/Checkbox";
import type { CompassScreen } from "@/types/compass";

interface ChecklistScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function ChecklistScreen({
  screen,
  answers,
  onAnswerChange,
}: ChecklistScreenProps) {
  const items = screen.checklistItems || [];

  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((item) => (
        <Checkbox
          key={item.key}
          checked={answers[item.key] === "true"}
          onChange={(checked) => onAnswerChange(item.key, String(checked))}
          label={item.label}
        />
      ))}
    </div>
  );
}
