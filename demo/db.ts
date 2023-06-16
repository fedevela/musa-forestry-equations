import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "sqlite3";

const db = new Database("./database.db");

const executeSQL = (req: NextApiRequest, res: NextApiResponse, sql: string) =>
  new Promise((resolve, reject) => {
    db.all(sql, [], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        res.json(row);
        resolve(row);
      }
    });
  });
export default executeSQL;
