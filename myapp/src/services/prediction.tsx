const STORAGE_KEY = "ns_match_predictions";
export type PickValue = "A" | "B" | "D";

export function readPicks(): Record<string, PickValue> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
export function savePick(matchId: string, pick: PickValue) {
  const all = readPicks();
  all[matchId] = pick;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
export function clearAllPicks() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isExpired(iso: string) {
  return Date.now() >= Date.parse(iso);
}
export function timeLeftText(iso: string) {
  const ms = Date.parse(iso) - Date.now();
  if (ms <= 0) return "Closed";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return d ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
}
