import type { CompassSessionData, CompassAnswers } from "@/types/compass";

const STORAGE_KEY = "compass-sessions";

function readAll(): CompassSessionData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(sessions: CompassSessionData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getSessions(): CompassSessionData[] {
  return readAll().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getSession(id: string): CompassSessionData | null {
  return readAll().find((s) => s.id === id) ?? null;
}

export function createSession(): CompassSessionData {
  const now = new Date().toISOString();
  const session: CompassSessionData = {
    id: crypto.randomUUID(),
    title: `Golden Compass — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    status: "in_progress",
    currentScreen: 0,
    answers: {},
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };
  const all = readAll();
  all.push(session);
  writeAll(all);
  return session;
}

export function updateSession(
  id: string,
  data: Partial<Pick<CompassSessionData, "currentScreen" | "answers" | "status" | "completedAt">>
) {
  const all = readAll();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
  writeAll(all);
}

export function deleteSession(id: string) {
  writeAll(readAll().filter((s) => s.id !== id));
}

export function getAnswerCount(answers: CompassAnswers): number {
  let count = 0;
  for (const inputs of Object.values(answers)) {
    for (const val of Object.values(inputs)) {
      if (val) count++;
    }
  }
  return count;
}
