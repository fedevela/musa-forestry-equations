import { Database } from "sqlite3";

const db = new Database("./database.db");

const executeSQL = (sql: string, parameters: any[] = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, parameters, (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
export { executeSQL };
