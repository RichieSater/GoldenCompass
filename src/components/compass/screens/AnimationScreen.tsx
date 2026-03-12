"use client";

import type { AnimationId } from "@/types/compass";
import BonfireAnimation from "../animations/BonfireAnimation";
import CompassRoseAnimation from "../animations/CompassRoseAnimation";
import CelebrationFinale from "../animations/CelebrationFinale";
import ForgivenessAnimation from "../animations/ForgivenessAnimation";

interface AnimationScreenProps {
  animation: AnimationId;
  allAnswers?: Record<string, Record<string, string>>;
}

export default function AnimationScreen({ animation, allAnswers }: AnimationScreenProps) {
  switch (animation) {
    case "bonfire-burn": {
      // bonfire-write is now a multi-input, items stored as JSON array
      let burdenItems: string[] = [];
      try {
        const raw = allAnswers?.["bonfire-write"]?.items || "[]";
        burdenItems = JSON.parse(raw);
      } catch {
        burdenItems = [];
      }
      return <BonfireAnimation items={burdenItems} />;
    }
    case "compass-rose-spin":
      return <CompassRoseAnimation />;
    case "celebration-finale":
      return <CelebrationFinale />;
    case "forgiveness-crossout": {
      const compassionText = allAnswers?.["past-compassion-box"]?.main || "";
      const items = compassionText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      return <ForgivenessAnimation items={items} />;
    }
    default:
      return null;
  }
}
