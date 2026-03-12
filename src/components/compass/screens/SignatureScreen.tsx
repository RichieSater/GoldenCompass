"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Input from "@/components/ui/Input";

interface SignatureScreenProps {
  answers: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function SignatureScreen({
  answers,
  onAnswerChange,
}: SignatureScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Auto-fill date and time
  useEffect(() => {
    if (!answers.date) {
      onAnswerChange(
        "date",
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }
    if (!answers.time) {
      onAnswerChange(
        "time",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        const touch = e.touches[0];
        return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    []
  );

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const pos = getPos(e);
    if (!ctx || !pos) return;
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const pos = getPos(e);
    if (!ctx || !pos) return;
    ctx.strokeStyle = "#C9A84C";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw() {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onAnswerChange("signature", canvas.toDataURL());
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onAnswerChange("signature", "");
    }
  }

  return (
    <div className="w-full space-y-6">
      <Input
        label="Print Name"
        value={answers.name || ""}
        onChange={(e) => onAnswerChange("name", e.target.value)}
        placeholder="Your full name"
        autoFocus
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-cream-muted">
            Signature
          </label>
          <button
            onClick={clearCanvas}
            className="text-xs text-cream-muted/50 hover:text-cream-muted"
          >
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          className="w-full cursor-crosshair rounded-xl border border-white/10 bg-charcoal/50 touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          value={answers.date || ""}
          onChange={(e) => onAnswerChange("date", e.target.value)}
          readOnly
        />
        <Input
          label="Time"
          value={answers.time || ""}
          onChange={(e) => onAnswerChange("time", e.target.value)}
          readOnly
        />
      </div>
    </div>
  );
}
