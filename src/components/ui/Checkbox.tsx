"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export default function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-lg border border-white/5 bg-charcoal/30 px-5 py-4 transition-all",
        checked
          ? "border-gold/30 bg-gold/5"
          : "hover:border-white/10 hover:bg-charcoal/50",
        className
      )}
    >
      <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "h-5 w-5 rounded border-2 transition-all",
            checked
              ? "border-gold bg-gold"
              : "border-white/20"
          )}
        >
          {checked && (
            <svg
              className="h-full w-full text-deep-black"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className={cn("text-sm leading-relaxed", checked ? "text-cream" : "text-cream-muted")}>
        {label}
      </span>
    </label>
  );
}
