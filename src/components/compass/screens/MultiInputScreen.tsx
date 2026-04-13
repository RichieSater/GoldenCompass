"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
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

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const focusIndex = pendingFocusIndexRef.current;
    if (focusIndex !== null && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex]?.focus();
      pendingFocusIndexRef.current = null;
    }
  }, [items]);

  function persist(nextItems: string[]) {
    setItems(nextItems);
    onAnswerChange("items", serializeListItems(nextItems));
  }

  function updateItem(index: number, value: string) {
    const nextItems = [...items];
    nextItems[index] = value;
    persist(nextItems);
  }

  function addItem(index = items.length - 1) {
    const firstEmptyIndex = items.findIndex((item) => item.trim().length === 0);
    if (firstEmptyIndex !== -1) {
      pendingFocusIndexRef.current = firstEmptyIndex;
      setItems((current) => [...current]);
      return;
    }

    if (maxItems !== undefined && items.length >= maxItems) return;

    const nextItems = [...items];
    nextItems.splice(index + 1, 0, "");
    setItems(nextItems);
    onAnswerChange("items", serializeListItems(nextItems));
    pendingFocusIndexRef.current = index + 1;
  }

  function removeItem(index: number) {
    if (items.length <= 1) {
      persist([""]);
      pendingFocusIndexRef.current = 0;
      return;
    }

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    persist(nextItems);
    pendingFocusIndexRef.current = Math.min(index, nextItems.length - 1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      if (!items[index].trim() && index === items.length - 1) return;

      addItem(index);
      return;
    }

    if (e.key === "Backspace" && items[index] === "" && items.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      removeItem(index);
    }
  }

  const filledCount = items.filter((item) => item.trim().length > 0).length;
  const canAddMore = maxItems === undefined || items.length < maxItems;
  const requirementText =
    minItems > 1 && maxItems !== undefined && minItems === maxItems
      ? `Add exactly ${minItems} items`
      : maxItems !== undefined
        ? `Add between ${minItems} and ${maxItems} items`
        : minItems > 1
          ? `Add at least ${minItems} items`
          : "Add as many items as you need";
  const statusText =
    maxItems !== undefined
      ? `${filledCount}/${maxItems} filled`
      : `${filledCount} item${filledCount === 1 ? "" : "s"} added`;

  return (
    <div className="w-full space-y-4">
      <div className="rounded-2xl border border-gold/15 bg-charcoal/35 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              List Builder
            </p>
            <p className="mt-1 text-sm text-cream">{requirementText}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-deep-black/40 px-3 py-1 text-xs font-medium text-cream-muted">
            {statusText}
          </div>
        </div>
        <p className="mt-3 text-xs text-cream-muted/70">
          Press Enter to add another row. Press Cmd/Ctrl+Enter to continue.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-charcoal/45 px-3 py-3 transition-colors focus-within:border-gold/35 hover:border-white/15"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-sm font-semibold tabular-nums text-gold">
              {index + 1}
            </div>
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder={
                index === 0
                  ? screen.placeholder || "Add an item..."
                  : "Add another item..."
              }
              autoFocus={index === 0 && items.length === 1}
              className="min-w-0 flex-1 border-0 bg-transparent px-1 py-1 text-base text-cream placeholder:text-cream-muted/35 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="shrink-0 rounded-lg border border-transparent px-2 py-1 text-xs font-medium uppercase tracking-[0.16em] text-cream-muted/60 transition-all hover:border-red-400/25 hover:bg-red-500/5 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => addItem()}
          disabled={!canAddMore}
        >
          + Add item
        </Button>
        <p className="text-xs text-cream-muted/60">
          Backspace on an empty row removes it.
          {!canAddMore && maxItems !== undefined
            ? ` You've reached the ${maxItems}-item limit for this prompt.`
            : ""}
        </p>
      </div>
    </div>
  );
}
