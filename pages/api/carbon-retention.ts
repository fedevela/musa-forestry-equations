import { NextApiRequest, NextApiResponse } from "next";
import executeSQL from "../../demo/db";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return executeSQL(
    `SELECT sum(hectares) as "valueSumHectares" FROM datahectare where plantedspecies="Teak" ;`
  ).then((valueSQL:any) => {
    const {valueSumHectares} = valueSQL[0]
    executeSQL(
      `SELECT teak as "tcValue" FROM dataflr where country="Colombia" and "Subnational unit"="Meta" limit 1 ;`
    ).then((valueSQL1:any) => {
      const {tcValue} = valueSQL1[0]
      const result: Number =
        (Number(valueSumHectares) * Number(tcValue) * 44) / 12;
      res.json({
        "potential-emissions-removals": result,
      });
    });
  });
}
