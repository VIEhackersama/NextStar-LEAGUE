// src/utils/news.js
export const BOOKMARK_KEY = "news_bookmarks_v1";

export const readBookmarks = () => {
  try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]"); }
  catch { return []; }
};
export const writeBookmarks = (ids) =>
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));

export const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

export const readingTime = (text) =>
  Math.max(1, Math.round((text?.split(/\s+/).length || 120) / 200));

export function inferCategory(n) {
  const s = `${n.title} ${n.content}`.toLowerCase();
  if (/transfer|sign|joins|contract|loan|fee|window/.test(s)) return "Transfers";
  if (/manager|sack|boss|coach/.test(s)) return "Managers";
  if (/stadium|capacity|facility|infrastructure/.test(s)) return "Club";
  if (/record|ballon|award|milestone/.test(s)) return "Records";
  if (/manchester|chelsea|arsenal|liverpool|tottenham|spurs|city|united|villa|west ham|newcastle|everton|wolves|palace|brighton|fulham|brentford|forest|luton|burnley|sheffield/.test(s)) return "Clubs";
  return "General";
}
