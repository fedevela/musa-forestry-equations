import { NextApiRequest, NextApiResponse } from "next";
import { executeSQL } from "../../demo/dbSQLite";

export default function getAllData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;
    return executeSQL(
      `SELECT * FROM user ${!id ? "" : " where id = ?"}`,
      !id ? [] : [id]
    ).then((rows) => {
      res.json(rows);
    });
  } else if (req.method === "POST") {
    const { id } = req.query;
    return executeSQL(
      `SELECT * FROM user ${!id ? "" : " where id = ?"}`,
      !id ? [] : [id]
    ).then((rows) => {
      res.json(rows);
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
