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

  return executeSQL(`SELECT DISTINCT plantedspecies FROM datahectare ;`).then(
    (valueSQL0: any) => {
      const valuePlantedSpecies = valueSQL0.map(
        (val: any) => "real_" + val.plantedspecies.toLowerCase()
      );
      executeSQL(`SELECT DISTINCT country FROM datahectare ;`).then(
        (valueSQL2: any) => {
          const valueCountries = valueSQL2.map((val: any) => val.country);
          executeSQL(`SELECT DISTINCT state FROM datahectare ;`).then(
            (valueSQL3: any) => {
              const valueStates = valueSQL3.map((val: any) => val.state);
              const mainSelectStatement = `
                    WITH resultDataFLR AS (
                        SELECT
                            ${valuePlantedSpecies.join(", ")},
                            country,
                            "Subnational unit"
                        FROM
                            dataflr
                        WHERE
                            country in ('${valueCountries.join("', '")}') and
                            "Subnational unit" in ('${valueStates.join(
                              "', '"
                            )}') 
                    ),
                    resultDataHectare AS (
                        SELECT
                            sum(hectares) as "valueSumHectares",
                            plantedspecies,
                            state,
                            country,
                            projectname
                        FROM
                            datahectare
                        GROUP BY
                            plantedspecies,
                            state,
                            country,
                            projectname
                    )
                    SELECT
                        resultDataFLR.${valuePlantedSpecies.join(
                          ", resultDataFLR."
                        )},
                        resultDataHectare.valueSumHectares,
                        resultDataHectare.plantedspecies,
                        resultDataHectare.state,
                        resultDataHectare.country,
                        resultDataHectare.projectname
                    FROM
                        resultDataHectare
                        JOIN resultDataFLR on resultDataHectare.state = resultDataFLR."Subnational unit"
                        AND resultDataHectare.country = resultDataFLR.country
                    GROUP BY
                        resultDataHectare.plantedspecies,
                        resultDataHectare.state,
                        resultDataHectare.country,
                        resultDataHectare.projectname;
                `;
              executeSQL(mainSelectStatement).then((valuesFLR: any) => {
                res.json({
                  valuesFLR,
                });
              });
            }
          );
        }
      );
    }
  );
}
