"use client";

import type { SaveStatus } from "@/types/compass";

interface ProgressIndicatorProps {
  sectionTitle: string;
  progress: number; // 0-1
  saveStatus: SaveStatus;
  currentScreen: number;
  totalScreens: number;
}

export default function ProgressIndicator({
  sectionTitle,
  progress,
  saveStatus,
  currentScreen,
  totalScreens,
}: ProgressIndicatorProps) {
  return (
    <div className="shrink-0 border-b border-white/5 bg-deep-black/80 backdrop-blur-sm">
      {/* Gold progress bar */}
      <div className="h-0.5 w-full bg-white/5">
        <div
          className="h-full bg-gold/60 transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gold">
            {sectionTitle}
          </span>
          <span className="text-xs text-cream-muted/40">
            {currentScreen + 1} / {totalScreens}
          </span>
        </div>

        <SaveIndicator status={saveStatus} />
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;

  return (
    <span className="flex items-center gap-1.5 text-xs text-cream-muted/50">
      {status === "saving" && (
        <>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/60" />
          Saving...
        </>
      )}
      {status === "saved" && (
        <>
          <svg className="h-3 w-3 text-gold/60" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Saved
        </>
      )}
      {status === "error" && (
        <span className="text-red-400">Save failed</span>
      )}
    </span>
  );
}
