import { Database } from "sqlite3";

const db = new Database("./database.db");

const executeSQLAll = (sql: string, parameters: any[] = []) =>
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
const executeSQLRun = (sql: string, parameters: any[] = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, parameters, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(1);
      }
    });
  });
export { executeSQLAll, executeSQLRun };
