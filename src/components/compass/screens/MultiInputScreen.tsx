"use client";

import { useState, useRef, useEffect } from "react";
import {
  getScreenListItems,
  serializeListItems,
} from "@/lib/list-answer-utils";
import type { CompassScreen } from "@/types/compass";

interface MultiInputScreenProps {
  screen: CompassScreen;
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function MultiInputScreen({
  screen,
  answers,
  onAnswerChange,
}: MultiInputScreenProps) {
  const minItems = screen.minItems ?? 1;
  const maxItems = screen.maxItems;

  const [items, setItems] = useState<string[]>(() => {
    const parsed = getScreenListItems(screen, answers);
    return parsed.length > 0 ? parsed : [""];
  });

  // Ref to track which input to focus after adding
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const focusIndex = pendingFocusIndexRef.current;
    if (focusIndex !== null && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex]?.focus();
      pendingFocusIndexRef.current = null;
    }
  }, [items.length]);

  function persist(newItems: string[]) {
    setItems(newItems);
    onAnswerChange("items", serializeListItems(newItems));
  }

  function updateItem(index: number, value: string) {
    const next = [...items];
    next[index] = value;
    persist(next);
  }

  function removeItem(index: number) {
    if (items.length <= 1) {
      // Don't remove the last row, just clear it
      persist([""]);
      pendingFocusIndexRef.current = 0;
      return;
    }
    const next = items.filter((_, i) => i !== index);
    persist(next);
    pendingFocusIndexRef.current = Math.min(index, next.length - 1);
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      // If current row is empty and it's the last one, don't add another
      if (!items[index].trim() && index === items.length - 1) return;
      if (maxItems !== undefined && items.length >= maxItems) return;

      // Add a new empty row below and focus it
      const next = [...items];
      next.splice(index + 1, 0, "");
      setItems(next);
      onAnswerChange("items", serializeListItems(next));
      pendingFocusIndexRef.current = index + 1;
      return;
    }

    if (e.key === "Backspace" && items[index] === "" && items.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      removeItem(index);
    }
  }

  return (
    <div className="w-full space-y-2">
      {items.map((item, i) => (
        <div key={i} className="group flex items-center gap-2">
          <span className="w-6 shrink-0 text-right text-xs tabular-nums text-gold/40">
            {i + 1}.
          </span>
          <input
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            placeholder={
              i === 0
                ? screen.placeholder || "Type and press Enter..."
                : "Press Enter to add more..."
            }
            autoFocus={i === 0 && items.length === 1}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-charcoal/50 px-4 py-2.5 text-sm text-cream placeholder:text-cream-muted/30 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
          />
          <button
            onClick={() => removeItem(i)}
            className="shrink-0 rounded p-1.5 text-cream-muted/0 transition-all group-hover:text-cream-muted/30 hover:!text-red-400"
            tabIndex={-1}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      <p className="pt-1 text-center text-[11px] text-cream-muted/30">
        Press Enter to add
        {" \u00b7 "}
        Backspace on empty to remove
        {" \u00b7 "}
        {"\u2318"}+Enter to continue
        {maxItems !== undefined ? ` \u00b7 ${Math.min(items.filter((item) => item.trim().length > 0).length, maxItems)}/${maxItems} items` : ""}
        {minItems > 1 && maxItems === undefined ? ` \u00b7 at least ${minItems} items` : ""}
      </p>
    </div>
  );
}
