import { NextApiRequest, NextApiResponse } from "next";
import executeSQL from "../../demo/db";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return executeSQL(req, res, `SELECT distinct country FROM dataflr order by 1;`);
}
