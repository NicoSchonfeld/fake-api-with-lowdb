import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));
let db;

export const createConnection = async () => {
  const file = join(_dirname, "../db.json");
  const adapter = new JSONFile(file);

  db = new Low(adapter);

  await db.read();

  /* db.data ||= { tasks: [] }; */

  await db.write();
};

export const getConnection = () => db;
