"use client";

import { getScreenListItems, parseStoredListItems } from "@/lib/list-answer-utils";
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
      const burdenItems = parseStoredListItems(
        allAnswers?.["bonfire-write"]?.items
      );
      return <BonfireAnimation items={burdenItems} />;
    }
    case "compass-rose-spin":
      return <CompassRoseAnimation />;
    case "celebration-finale":
      return <CelebrationFinale />;
    case "forgiveness-crossout": {
      const items = getScreenListItems(
        {
          id: "past-compassion-box",
          sectionIndex: 2,
          sectionKey: "past",
          sectionTitle: "The Past",
          type: "multi-input",
        },
        allAnswers?.["past-compassion-box"]
      );
      return <ForgivenessAnimation items={items} />;
    }
    default:
      return null;
  }
}
