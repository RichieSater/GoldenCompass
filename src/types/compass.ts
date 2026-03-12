export type ScreenType =
  | "interstitial"
  | "textarea"
  | "short-text"
  | "multi-short-text"
  | "multi-textarea"
  | "multi-input"
  | "checklist"
  | "ritual"
  | "signature"
  | "roadmap-builder"
  | "animation";

export type AnimationId =
  | "bonfire-burn"
  | "compass-rose-spin"
  | "forgiveness-crossout"
  | "golden-particles"
  | "celebration-finale"
  | null;

export type BackgroundVariant =
  | "default"
  | "dark"
  | "warm"
  | "dawn"
  | "night";

export interface ScreenInput {
  key: string;
  label?: string;
  placeholder?: string;
  type?: "short" | "long";
}

export interface ChecklistItem {
  key: string;
  label: string;
}

export interface CompassScreen {
  id: string;
  sectionIndex: number;
  sectionKey: string;
  sectionTitle: string;
  type: ScreenType;

  // Content
  headline?: string;
  narrativeText?: string;
  questionText?: string;
  placeholder?: string;

  // For multi-input types
  inputs?: ScreenInput[];

  // For checklist type
  checklistItems?: ChecklistItem[];
  requireAllChecked?: boolean;

  // Animation
  animation?: AnimationId;
  animationDuration?: number;

  // Behavior
  isRequired?: boolean;
  prefillFrom?: string;

  // Visual
  backgroundVariant?: BackgroundVariant;
}

export interface CompassSection {
  index: number;
  key: string;
  title: string;
  subtitle: string;
  screens: CompassScreen[];
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export type NavigationDirection = "forward" | "backward";

export interface CompassAnswers {
  [screenId: string]: {
    [inputKey: string]: string;
  };
}

export interface CompassSessionData {
  id: string;
  title: string;
  status: "in_progress" | "completed";
  currentScreen: number;
  answers: CompassAnswers;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}
