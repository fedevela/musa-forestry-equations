import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { ChartData } from "chart.js";

const FLRCalculator = () => {
  const [woodDensityConstant, setWoodDensityConstant] = useState<number>(1);
  const [growthFactorConstant, setGrowthFactorConstant] = useState<number>(1);
  const [environmentalConstant, setEnvironmentalConstant] = useState<number>(1);
  class DataItemHectare {
    id!: number;
    flrtype!: string;
    projectname!: string;
    country!: string;
    state!: string;
    plantedspecies!: string;
    year!: number;
    hectares!: number;
  }

  function calculateName(dih: DataItemHectare) {
    return dih.flrtype + " " + dih.country + " " + (dih.hectares + "(ha)");
  }

  const [hectareData, setHectareData] = useState<DataItemHectare[]>([]);

  const xLabels = hectareData.map((hctr) => hctr.year);

  const lineData: ChartData = {
    labels: xLabels,
    datasets: hectareData.map((hctr) => ({
      label: calculateName(hctr),
      data: hectareData.map((hctr) => hctr.hectares),
      fill: false,
      tension: 0.4,
    })),
  };

  useEffect(() => {
    axios
      .get("/api/data-hectares", {})
      .then((response) => {
        setHectareData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            enter details about the number of hectares placed under restoration
          </div>
          <DataTable
            value={hectareData}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* <Column field="id" header="id"></Column> */}
            <Column field="projectname" header="Proyect"></Column>
            <Column field="flrtype" header="Type"></Column>
            <Column field="country" header="Country"></Column>
            <Column field="state" header="Region"></Column>
            <Column field="plantedspecies" header="Species"></Column>
            <Column field="year" header="Year"></Column>
            <Column field="hectares" header="Hectares"></Column>
          </DataTable>
        </div>
      </div>

      {/* FLI 2 : RESULTS */}
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">RESULTS</div>
          <div className="text-500 mb-5">RESULTS</div>

          <div className="card">
            <h5>hectares</h5>
            <Chart type="line" data={lineData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FLRCalculator;
