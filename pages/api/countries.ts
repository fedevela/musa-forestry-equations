import { NextApiRequest, NextApiResponse } from "next";
import executeSQLAndFillResponseWithValue from "../../demo/db";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return executeSQLAndFillResponseWithValue(req, res, `SELECT distinct country FROM dataflr order by 1;`);
}
