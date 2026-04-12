import type { CompassScreen } from "@/types/compass";

type ScreenAnswers = Record<string, string>;

function cleanItems(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

export function serializeListItems(items: string[]) {
  return JSON.stringify(cleanItems(items));
}

export function parseStoredListItems(raw: string | undefined | null) {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return cleanItems(
      parsed.filter((item): item is string => typeof item === "string")
    );
  } catch {
    return [];
  }
}

function parseLegacyTextareaItems(answers: ScreenAnswers) {
  const main = answers.main?.trim();
  if (!main) return [];

  return cleanItems(main.split(/\r?\n+/));
}

function parseLegacyKeyItems(answers: ScreenAnswers, keys: string[]) {
  if (keys.length === 0) return [];
  return cleanItems(keys.map((key) => answers[key] || ""));
}

export function getScreenListItems(
  screen: CompassScreen,
  answers?: ScreenAnswers
) {
  if (!answers) return [];

  const storedItems = parseStoredListItems(answers.items);
  if (storedItems.length > 0) return storedItems;

  const keyedItems = parseLegacyKeyItems(answers, screen.legacyListKeys || []);
  if (keyedItems.length > 0) return keyedItems;

  return parseLegacyTextareaItems(answers);
}

export function getNormalizedListAnswers(
  screen: CompassScreen,
  answers?: ScreenAnswers
): ScreenAnswers {
  if (!answers) return {};
  if (answers.items) return answers;

  const items = getScreenListItems(screen, answers);
  if (items.length === 0) return answers;

  return {
    ...answers,
    items: serializeListItems(items),
  };
}
