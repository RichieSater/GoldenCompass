"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (el: HTMLTextAreaElement | null) => {
      internalRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    function autoResize() {
      const el = internalRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${Math.max(el.scrollHeight, 120)}px`;
      }
    }

    useEffect(() => {
      autoResize();
    }, [props.value]);

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-cream-muted">
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          onChange={(e) => {
            autoResize();
            onChange?.(e);
          }}
          className={cn(
            "w-full resize-none rounded-xl border border-white/10 bg-charcoal/50 px-5 py-4 text-base leading-relaxed text-cream placeholder-cream-muted/30 outline-none transition-all",
            "focus:border-gold/40 focus:ring-2 focus:ring-gold/10",
            "min-h-[120px]",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
