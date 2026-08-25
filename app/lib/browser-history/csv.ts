import { browserHistoryRecordSchema, resolveHeaderDefinition, type BrowserHistoryRecord } from './schema';

export type ParsedCsv = { fileName: string; records: BrowserHistoryRecord[]; warnings: string[]; error?: string };

function parseLine(line: string) {
  const cells: string[] = []; let cell = ''; let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]; const next = line[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { cells.push(cell.trim()); cell = ''; }
    else cell += char;
  }
  cells.push(cell.trim());
  return cells;
}

export function parseCsv(text: string, fileName: string): ParsedCsv {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return { fileName, records: [], warnings: [], error: 'This file is empty.' };
  const headers = parseLine(lines[0]);
  const definition = resolveHeaderDefinition(headers);
  if (!definition) return { fileName, records: [], warnings: [], error: `Unsupported headers. Expected ${['DateTime', 'NavigatedToUrl', 'PageTitle'].join(',')}.` };
  const records: BrowserHistoryRecord[] = []; const warnings: string[] = [];
  lines.slice(1).forEach((line, index) => {
    const cells = parseLine(line);
    if (cells.length !== headers.length) { warnings.push(`Row ${index + 2} has the wrong number of columns.`); return; }
    const result = browserHistoryRecordSchema.safeParse({ dateTime: cells[0], navigatedToUrl: cells[1], pageTitle: cells[2] });
    if (result.success) records.push(result.data); else warnings.push(`Row ${index + 2} was skipped because it is invalid.`);
  });
  return { fileName, records, warnings };
}

export async function parseFiles(files: File[]) {
  return Promise.all(files.map(async (file) => parseCsv(await file.text(), file.name)));
}
