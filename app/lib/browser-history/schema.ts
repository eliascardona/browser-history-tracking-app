import { z } from 'zod';

export const browserHistoryRecordSchema = z.object({
  dateTime: z.coerce.date(),
  navigatedToUrl: z.string().url(),
  pageTitle: z.string().trim().min(1),
});

export const canonicalHeaderSetSchema = z.literal('DateTime,NavigatedToUrl,PageTitle');
export const headerMappingSchema = z.object({
  dateTime: z.string(),
  navigatedToUrl: z.string(),
  pageTitle: z.string(),
});
export const csvHeaderDefinitionSchema = z.object({
  id: z.string(),
  headers: z.array(z.string()).min(1),
  mapping: headerMappingSchema,
});

export type BrowserHistoryRecord = z.infer<typeof browserHistoryRecordSchema>;
export type HeaderMapping = z.infer<typeof headerMappingSchema>;
export type CsvHeaderDefinition = z.infer<typeof csvHeaderDefinitionSchema>;

export const currentHeaderDefinition: CsvHeaderDefinition = {
  id: 'browser-history-v1',
  headers: ['DateTime', 'NavigatedToUrl', 'PageTitle'],
  mapping: { dateTime: 'DateTime', navigatedToUrl: 'NavigatedToUrl', pageTitle: 'PageTitle' },
};

export const mockBrowserHistoryRecords = browserHistoryRecordSchema.array().parse([
  { dateTime: '2026-08-24T23:44:38.689Z', navigatedToUrl: 'https://www.postgresql.org/files/documentation/pdf/17/postgresql-17-A4.pdf', pageTitle: 'PostgreSQL 17.11 Documentation' },
  { dateTime: '2026-08-24T23:42:29.916Z', navigatedToUrl: 'https://www.kernel.org/doc/html/v6.9/peci/peci.html', pageTitle: 'Overview — The Linux Kernel documentation' },
  { dateTime: '2026-08-24T23:42:27.692Z', navigatedToUrl: 'https://www.kernel.org/doc/html/v6.9/peci/index.html', pageTitle: 'PECI Subsystem — The Linux Kernel documentation' },
]);

export function resolveHeaderDefinition(headers: string[]) {
  const normalized = headers.map((header) => header.trim());
  return normalized.join(',') === currentHeaderDefinition.headers.join(',') ? currentHeaderDefinition : null;
}
