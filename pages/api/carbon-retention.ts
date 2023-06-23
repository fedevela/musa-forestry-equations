import { NextApiRequest, NextApiResponse } from "next";
import executeSQL from "../../demo/db";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const columnLookup = {
    teak: "real_teak",
    eucalyptus: "real_eucalyptus",
    "other broadleaf": "real_otherbroadleaf",
    oak: "real_oak",
    pine: "real_pine",
    "other conifer": "real_otherconifer",
    "Natural Regeneration": "real_naturalregeneration",
    "Mangrove Restoration - tree": "real_mangroverestoration-tree",
    "Mangrove Restoration - shrub": "real_mangroverestoration-shrub",
    Agroforestry: "real_agroforestry",
    "Average FLR 20y": "real_averageflr20y",
  };

  return executeSQL(
    `SELECT sum(hectares), plantedspecies as "valueSumHectares" FROM datahectare group by plantedspecies ;`
  ).then((valueSQL: any) => {
    const { valueSumHectares } = valueSQL[0];
    executeSQL(
      `SELECT real_teak as "tcValue" FROM dataflr where country="Colombia" and "Subnational unit"="Meta" limit 1 ;`
    ).then((valueSQL1: any) => {
      const { tcValue } = valueSQL1[0];
      res.json({
        "potential-emissions-removals":
          (Number(valueSumHectares) * Number(tcValue) * 44) / 12,
        "potential-emissions-removals-rate": (Number(tcValue) * 44) / 12,
      });
    });
  });
}
