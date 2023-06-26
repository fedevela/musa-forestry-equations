import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { ChartData } from "chart.js";
import IHectareData from "../../../demo/dbmodel/hectaredata";
import { Accordion, AccordionTab } from "primereact/accordion";
import ICarbonRetentionResults from "../../../demo/dbmodel/carbonretentionresults";

const FLRCalculator = () => {
  const [hectareData, setHectareData] = useState<{
    [key: string]: { [key: string]: IHectareData[] };
  }>({});
  const [carbonRetentionResults, setCarbonRetentionResults] =
    useState<ICarbonRetentionResults>({} as ICarbonRetentionResults);

  // const xLabels = hectareData.map((hctr) => hctr.year);

  // const lineData: ChartData = {
  //   labels: xLabels,
  //   datasets: hectareData.map((hctr) => ({
  //     label: calculateName(hctr),
  //     data: hectareData.map((hctr) => hctr.hectares),
  //     fill: false,
  //     tension: 0.4,
  //   })),
  // };

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
            {Object.keys(hectareData).map((projectName, index) => (
              <AccordionTab header={`Project: '${projectName}'`} key={index}>
                <Accordion>
                  {Object.keys(hectareData[projectName]).map(
                    (plantedspecies, index2) => {
                      const retentionData: any =
                        carbonRetentionResults.valuesFLR.filter(
                          (crr) =>
                            crr.plantedspecies === plantedspecies &&
                            crr.projectname === projectName
                        )[0];
                      const plantedspeciesVarName =
                        plantedspecies.toLowerCase();
                      return (
                        <AccordionTab
                          header={`Planted species: '${plantedspecies}'`}
                          key={index}
                        >
                          <ul>
                            <li>
                              Potential emissions removal:{" "}
                              {retentionData[
                                `real_${plantedspeciesVarName}_potential_emissions_removals_rate`
                              ].toFixed(2)}
                            </li>
                            <li>
                              Potential emissions removal rate:{" "}
                              {retentionData[
                                `real_${plantedspeciesVarName}_potential_emissions_removals`
                              ].toFixed(2)}
                            </li>
                          </ul>
                          <DataTable
                            value={hectareData[projectName][plantedspecies]}
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
                            <Column field="hectares" header="Hectares"></Column>
                          </DataTable>
                        </AccordionTab>
                      );
                    }
                  )}
                </Accordion>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      </div>

      {/* FLI 2 : RESULTS */}
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">RESULTS</div>
          <div className="text-500 mb-5">RESULTS</div>

          <div className="card">
            <h5>hectares</h5>
            {/* <Chart type="line" data={lineData} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FLRCalculator;
