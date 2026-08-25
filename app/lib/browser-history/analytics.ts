import type { BrowserHistoryRecord } from './schema';

export function domainOf(url: string) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'unknown'; } }

export const domainAccentPalette = ['#0ea5e9', '#f97316', '#22c55e', '#a855f7', '#eab308', '#ec4899', '#14b8a6', '#ef4444'] as const;

export function domainAccentMap(records: BrowserHistoryRecord[]) {
  const domains = [...new Set(records.map((record) => domainOf(record.navigatedToUrl)))].sort();
  return new Map(domains.map((domain, index) => [domain, domainAccentPalette[index % domainAccentPalette.length]]));
}
export function summarize(records: BrowserHistoryRecord[]) {
  const domains = new Set(records.map((record) => domainOf(record.navigatedToUrl)));
  const days = new Set(records.map((record) => record.dateTime.toISOString().slice(0, 10)));
  const hours = records.reduce<Record<number, number>>((acc, record) => { const hour = record.dateTime.getHours(); acc[hour] = (acc[hour] ?? 0) + 1; return acc; }, {});
  const peakHour = Object.entries(hours).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0];
  return { total: records.length, uniqueDomains: domains.size, activeDays: days.size, peakHour: peakHour === undefined ? '—' : `${peakHour.padStart(2, '0')}:00` };
}
export function topDomains(records: BrowserHistoryRecord[]) {
  const counts = records.reduce<Record<string, number>>((acc, record) => { const domain = domainOf(record.navigatedToUrl); acc[domain] = (acc[domain] ?? 0) + 1; return acc; }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
}
export function dayBuckets(records: BrowserHistoryRecord[]) {
  const counts = records.reduce<Record<string, number>>((acc, record) => { const day = record.dateTime.toISOString().slice(0, 10); acc[day] = (acc[day] ?? 0) + 1; return acc; }, {});
  return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).slice(-7);
}
