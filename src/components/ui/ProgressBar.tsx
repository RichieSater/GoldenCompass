import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-1
  className?: string;
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-white/5", className)}>
      <div
        className="h-full rounded-full bg-gold/60 transition-all duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
      />
    </div>
  );
}
