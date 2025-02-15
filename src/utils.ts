import fs from 'fs';
import path from 'path'; 

export function aggregateOneToMany<
  TRow extends Record<string, any>,
  TOne extends keyof TRow,
  TMany extends keyof TRow,
>(
  rows: TRow[],
  one: TOne,
  many: TMany,
): {
  [K in TOne]: TRow[TOne] & { [K in TMany]: NonNullable<TRow[TMany]>[] }
}[] {
  const map: Record<string, { one: TRow[TOne]; many: TRow[TMany][] }> = {}
  for (const row of rows) {
    const id = row[one]
    if (!map[id]) {
      map[id] = { one: row[one], many: [] }
    }
    if (row[many] != null) {
      map[id]!.many.push(row[many])
    }
  }
  return Object.values(map).map((r) => ({ ...r.one, [many]: r.many }))
}

export function logFilesAndDirectories(dir: string) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Unable to scan directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Unable to get file stats: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`Directory: ${filePath}`);
          logFilesAndDirectories(filePath); // Recursively log files in subdirectories
        } else {
          console.log(`File: ${filePath}`);
        }
      });
    });
  });
}
