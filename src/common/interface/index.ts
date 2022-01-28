interface InsertResult {
  identifiers: identifier[];
  generatedMaps: generatedMap[];
  raw: raw;
}

interface identifier {
  id: number;
}
interface generatedMap {
  id: number;
  created_at: Date;
}
interface raw {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export { InsertResult };
