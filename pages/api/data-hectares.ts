import { NextApiRequest, NextApiResponse } from "next";
import executeSQLAndFillResponseWithValue from "../../demo/dbSQLite";
import IHectareData from "../../demo/dbmodel/hectaredata";

export default async function getAllData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return executeSQLAndFillResponseWithValue(
    `SELECT * FROM datahectare order by projectname, plantedspecies, year ;`
  ).then((rows) => {
    const hectaresData = rows as IHectareData[];
    const resultJSON: {[key: string]: {[key: string]: IHectareData[]}} = {}

    hectaresData.forEach((hectareData) => {
      let projectMap = resultJSON[hectareData.projectname];
      if (!projectMap) {
        projectMap = {};
        resultJSON[hectareData.projectname]=projectMap;
      }
      let plantedspeciesArray = projectMap[hectareData.plantedspecies];
      if (!plantedspeciesArray) {
        plantedspeciesArray = [];
        projectMap[hectareData.plantedspecies]  =  plantedspeciesArray;
      }
      plantedspeciesArray.push(hectareData);
    });

    res.json(resultJSON);
  });
}
