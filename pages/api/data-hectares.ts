import { NextApiRequest, NextApiResponse } from "next";
import executeSQLAndFillResponseWithValue from "../../demo/db";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return executeSQLAndFillResponseWithValue(`SELECT * FROM datahectare ;`).then(
    (row) => res.json(row)
  );
}
