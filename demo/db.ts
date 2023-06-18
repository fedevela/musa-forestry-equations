import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "sqlite3";

const db = new Database("./database.db");

const executeSQL = (sql: string) =>
  new Promise((resolve, reject) => {
    db.all(sql, [], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
export default executeSQL;
