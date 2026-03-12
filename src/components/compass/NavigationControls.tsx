"use client";

import { cn } from "@/lib/utils";
import type { ScreenType } from "@/types/compass";

interface NavigationControlsProps {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isFirst: boolean;
  isLast: boolean;
  screenType: ScreenType;
  onSaveAndExit: () => void;
}

export default function NavigationControls({
  onBack,
  onNext,
  canProceed,
  isFirst,
  isLast,
  screenType,
  onSaveAndExit,
}: NavigationControlsProps) {
  const isInterstitialOrAnimation =
    screenType === "interstitial" || screenType === "animation";
  const needsCmdEnter =
    screenType === "textarea" ||
    screenType === "multi-textarea" ||
    screenType === "multi-input";

  return (
    <div className="shrink-0 border-t border-white/5 bg-deep-black/80 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div className="flex items-center gap-3">
          {!isFirst && (
            <button
              onClick={onBack}
              className="rounded-lg px-4 py-2 text-sm text-cream-muted transition-colors hover:text-cream"
            >
              ← Back
            </button>
          )}
          <button
            onClick={onSaveAndExit}
            className="rounded-lg px-4 py-2 text-xs text-cream-muted/50 transition-colors hover:text-cream-muted"
          >
            Save & Exit
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isInterstitialOrAnimation && (
            <span className="text-xs text-cream-muted/40">
              {needsCmdEnter ? "⌘+Enter ↵" : "Press Enter ↵"}
            </span>
          )}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              "rounded-lg px-6 py-2.5 text-sm font-semibold transition-all",
              canProceed
                ? "bg-gold text-deep-black hover:bg-gold-light"
                : "cursor-not-allowed bg-white/5 text-cream-muted/30"
            )}
          >
            {isLast ? "Complete" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
