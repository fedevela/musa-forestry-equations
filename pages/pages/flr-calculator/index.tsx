import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import IHectareData from "../../../demo/dbmodel/hectaredata";
import { Accordion, AccordionTab } from "primereact/accordion";
import {
  ICarbonRetentionResults,
} from "../../../demo/dbmodel/carbonretentionresults";

const FLRCalculator = () => {
  let totalPotentialEmissionsRemovals = 0;
  let lineData = {};
  const [hectareData, setHectareData] = useState<{
    [key: string]: { [key: string]: IHectareData[] };
  }>({});
  const [carbonRetentionResults, setCarbonRetentionResults] =
    useState<ICarbonRetentionResults>({} as ICarbonRetentionResults);

  function executeRefreshHectareData() {
    axios
      .get("/api/data-hectares", {})
      .then((response) => {
        setHectareData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function executeRefreshCarbonRetention() {
    axios
      .get("/api/carbon-retention", {})
      .then((response: any) => {
        setCarbonRetentionResults(response.data as ICarbonRetentionResults);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {
  //   console.log("carbonRetentionResults");
  //   console.log(carbonRetentionResults);
  //   console.log("hectareData");
  //   console.log(hectareData);
  // }, [hectareData, carbonRetentionResults]);

  useEffect(() => {
    executeRefreshHectareData();
    executeRefreshCarbonRetention();
  }, []);

  return (
    <>
      {/* STEP 0 : LANDING PAGE */}
      <div className="card mb-0">
        <div className="grid grid-nogutter surface-0 text-800">
          <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
              <span className="block text-6xl font-bold mb-1">
                Musa Agroforestry
              </span>
              <div className="text-6xl text-primary font-bold mb-3">
                Allometric equation calculator
              </div>
              <p className="mt-0 mb-4 text-700 line-height-3">
                Forest Landscape Restoration Carbon Storage Calculator
              </p>
              <Button
                label="Begin"
                type="button"
                className="mr-3 p-button-raised"
              />
            </section>
          </div>
          <div className="col-12 md:col-6 overflow-hidden">
            <img
              src="/demo/images/blocks/hero/hero-1.jpg"
              alt="hero-1"
              className="md:ml-auto block md:h-full"
              style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" }}
            />
          </div>
        </div>
      </div>

      {/* FLI 1 : HECTARE INFORMATION INPUT TABLE */}
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">
            Number of Hectares input form
          </div>
          <div className="text-500 mb-5">
            details about the number of hectares placed under restoration
          </div>
          <Accordion>
            {Object.keys(hectareData).map((currentProjectName, index) => {
              if (!carbonRetentionResults?.valueYearRollup === false) {
                const currentProjectYearRollup =
                  carbonRetentionResults?.valueYearRollup[currentProjectName];
                /**
                 * CALCULATE LABELS
                 */
                const xLabelsSet = new Set();
                Object.keys(currentProjectYearRollup)
                  .map((aPlantedSpecies) =>
                    Object.keys(currentProjectYearRollup[aPlantedSpecies])
                  )
                  .forEach((arrayWithYears: string[]) =>
                    arrayWithYears.forEach((aYearString: string) =>
                      xLabelsSet.add(aYearString)
                    )
                  );
                const xLabels = Array.from(xLabelsSet.values()).sort();

                /**
                 * CALCULATE TOTAL RETENTION
                 */
                totalPotentialEmissionsRemovals =
                  carbonRetentionResults?.valuesFLR
                    ?.filter((crr) => crr.projectname === currentProjectName)
                    .reduce(
                      (previousValue, currentValue) =>
                        previousValue +
                        (currentValue.potential_emissions_removals || 0),
                      0
                    );

                /**
                 * CALCULATE CHART DATA
                 */
                lineData = {
                  labels: xLabels,
                  datasets: Object.keys(currentProjectYearRollup).map(
                    (aPlantedSpecies: string) => {
                      const currentDataFLR =
                        carbonRetentionResults?.valuesFLR?.filter(
                          (crr) =>
                            crr.plantedspecies === aPlantedSpecies &&
                            crr.projectname === currentProjectName
                        )[0];

                      const currentProjectSpeciesYearRollup =
                        currentProjectYearRollup[aPlantedSpecies];
                      const currentTotalRemovals = Object.keys(
                        currentProjectSpeciesYearRollup
                      ).reduce(
                        (previousValue, currentValue) =>
                          previousValue +
                          ((currentProjectSpeciesYearRollup as any)[
                            currentValue
                          ] || 0),
                        0
                      );
                      let lastRemovalsValue = 0;
                      return {
                        label: aPlantedSpecies,
                        // data: [],
                        data: Object.keys(currentProjectSpeciesYearRollup)
                          .sort()
                          .map((aYearStr) => {
                            const hectaresValue = (
                              currentProjectYearRollup as any
                            )[aPlantedSpecies][aYearStr];
                            lastRemovalsValue +=
                              (hectaresValue *
                                currentDataFLR.potential_emissions_removals) /
                              currentTotalRemovals;
                            return lastRemovalsValue;
                          }),
                        fill: false,
                        tension: 0.4,
                      };
                    }
                  ),
                };
              }

              return (
                <AccordionTab
                  header={`Project: '${currentProjectName}'`}
                  key={index}
                >
                  <ul>
                    <li>
                      Potential emissions removals:{" "}
                      {totalPotentialEmissionsRemovals.toFixed(2)} (CO2e)
                    </li>
                  </ul>

                  <div className="card mb-0">
                    <div className="surface-0">
                      <div className="font-medium text-3xl text-900 mb-3">
                        Annual Removals from FLR Activities (t CO2)
                      </div>
                      <div className="card">
                        {lineData ? (
                          <Chart type="line" data={lineData} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <Accordion>
                    {Object.keys(hectareData[currentProjectName]).map(
                      (currentPlantedspecies) => {
                        const retentionData: any =
                          carbonRetentionResults?.valuesFLR?.filter(
                            (crr) =>
                              crr.plantedspecies === currentPlantedspecies &&
                              crr.projectname === currentProjectName
                          )[0];
                        return (
                          <AccordionTab
                            header={`Planted species: '${currentPlantedspecies}'`}
                            key={index}
                          >
                            {!retentionData === false ? (
                              <ul>
                                <li>
                                  Potential emissions removal : retentionData[
                                  `potential_emissions_removals` ]?.toFixed(2){" "}
                                  (CO2e)
                                </li>
                                <li>
                                  Potential emissions removal rate :{" "}
                                  {retentionData[
                                    `potential_emissions_removals_rate`
                                  ].toFixed(2)}{" "}
                                  (CO2e/(y Ha))
                                </li>
                              </ul>
                            ) : (
                              <></>
                            )}
                            <DataTable
                              value={
                                hectareData[currentProjectName][
                                  currentPlantedspecies
                                ]
                              }
                              dataKey="id"
                              tableStyle={{ minWidth: "50rem" }}
                            >
                              <Column
                                header=" "
                                body={(dih: IHectareData) => (
                                  <div className="flex-nowrap">
                                    <Button label=" " icon="pi pi-file-edit" />{" "}
                                    <Button
                                      label=" "
                                      severity="danger"
                                      icon="pi pi-trash"
                                    />
                                  </div>
                                )}
                              ></Column>
                              <Column
                                field="projectname"
                                header="Proyect"
                              ></Column>
                              <Column field="flrtype" header="Type"></Column>
                              <Column field="country" header="Country"></Column>
                              <Column field="state" header="Region"></Column>
                              <Column
                                field="plantedspecies"
                                header="Species"
                              ></Column>
                              <Column field="year" header="Year"></Column>
                              <Column
                                field="hectares"
                                header="Hectares"
                              ></Column>
                            </DataTable>
                          </AccordionTab>
                        );
                      }
                    )}
                  </Accordion>
                </AccordionTab>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FLRCalculator;
