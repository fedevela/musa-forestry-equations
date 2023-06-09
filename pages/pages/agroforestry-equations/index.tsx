import React, { useState } from "react";
import { Button } from "primereact/button";
import Latex from "react-latex";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { ChartData, ChartOptions } from "chart.js";
import { Chart } from "primereact/chart";

const EmptyPage = () => {
  const [woodDensityConstant, setWoodDensityConstant] = useState<number>(1);
  const [growthFactorConstant, setGrowthFactorConstant] = useState<number>(1);
  const [environmentalConstant, setEnvironmentalConstant] = useState<number>(1);
  class EnumFormulaItem {
    name!: string;
    forestType!: string;
    rainfall!: string;
    formulaTxt!: string;
    id!: number;
    checked!: boolean;
    formulaExecution?: (dbh: number) => number;
  }

  function calculateName(formula: EnumFormulaItem) {
    return (
      formula.name +
      " " +
      formula.forestType +
      " " +
      (formula.rainfall ? formula.rainfall + "(mm)" : "")
    );
  }

  interface EnumFormulaItems extends Array<EnumFormulaItem> {}

  const calculateBasalArea = (dbh: number) => Math.PI * (dbh / 2) ** 2;

  debugger;
  const formulaeJSON: EnumFormulaItem[] = [
    {
      name: "Chave 2014",
      forestType: "All",
      rainfall: "",
      formulaTxt:
        "AGB = exp[-1.803 - 0.976 × E + 0.976 × ln(ρ) + 2.673 × ln(dbh) - 0.0299 × [ln(dbh)]^2]",
      formulaExecution: (dbh) =>
        Math.exp(
          -1.803 -
            0.976 * environmentalConstant +
            0.976 * Math.log(woodDensityConstant) +
            2.673 * Math.log(dbh) -
            0.0299 * Math.log(dbh) ** 2
        ),
      id: 0,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "dry",
      rainfall: "<1500",
      formulaTxt:
        "AGB = ρ × exp[-0.667 + 1.784 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      formulaExecution: (dbh) =>
        woodDensityConstant *
        Math.exp(
          -0.667 +
            1.784 * Math.log(dbh) +
            0.207 * Math.log(dbh) ** 2 -
            0.0281 * Math.log(dbh) ** 3
        ),
      id: 1,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "moist",
      rainfall: "1500-3500",
      formulaTxt:
        "AGB = ρ × exp[-1.499 + 2.148 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      formulaExecution: (dbh) =>
        woodDensityConstant *
        Math.exp(
          -1.499 +
            2.148 * Math.log(dbh) +
            0.207 * Math.log(dbh) ** 2 -
            0.0281 * Math.log(dbh) ** 3
        ),
      id: 2,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "wet",
      rainfall: ">3500",
      formulaTxt:
        "AGB = ρ × exp[-1.239 + 1.980 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      formulaExecution: (dbh) =>
        woodDensityConstant *
        Math.exp(
          -1.239 +
            1.98 * Math.log(dbh) +
            0.207 * Math.log(dbh) ** 2 -
            0.0281 * Math.log(dbh) ** 3
        ),
      id: 3,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "dry",
      rainfall: "700-900",
      formulaTxt: "AGB = 10^(-0.535 + log10(BA))",
      formulaExecution: (dbh) =>
        10 ** (-0.535 + Math.log10(calculateBasalArea(dbh))),
      id: 4,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "dry",
      rainfall: "900-1500",
      formulaTxt: "AGB = 0.2035 × dbh^2.3196",
      formulaExecution: (dbh) => 0.2035 * dbh ** 2.3196,
      id: 5,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "moist",
      rainfall: "1500-4000",
      formulaTxt: "AGB = exp[-2.289 + 2.649 × ln(dbh) - 0.021 × [ln(dbh)]^2]",
      formulaExecution: (dbh) =>
        Math.exp(-2.289 + 2.649 * Math.log(dbh) - 0.021 * Math.log(dbh) ** 2),
      id: 6,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "wet",
      rainfall: ">4000",
      formulaTxt: "AGB = 21.297 - 6.953 × dbh + 0.740 × dbh^2",
      formulaExecution: (dbh) => 21.297 - 6.953 * dbh + 0.74 * dbh ** 2,
      id: 7,
      checked: true,
    },
  ];

  const xLabels = Array.from(Array(100).keys());

  const [formulae, setFormulae] = useState<EnumFormulaItem[]>(formulaeJSON);
  const [selectedFormulae, setSelectedFormulae] = useState<EnumFormulaItem[]>(
    formulaeJSON.filter((f) => f.checked)
  );

  const lineData: ChartData = {
    labels: xLabels,
    datasets: selectedFormulae.map((formula) => ({
      label: calculateName(formula),
      data: xLabels.map((dbh) =>
        !formula.formulaExecution ? 0 : formula.formulaExecution(dbh)
      ),
      fill: false,
      tension: 0.4,
    })),
  };

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
                calculate and visualize allometric equations
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

      {/* STEP 1 : FORMULA SELECTION */}
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">
            Step 1 : Formula Selection
          </div>
          <div className="text-500 mb-5">
            these are the available Above Ground Biomass (AGB) formulae
          </div>
          <Panel header="Constants" toggleable collapsed={true}>
            <h5>Growth Factor</h5>
            <p className="m-0">
              <span className="p-float-label">
                <InputText
                  id="growthfactor"
                  type="text"
                  value={`${growthFactorConstant}`}
                  onChange={(e) =>
                    setGrowthFactorConstant(parseFloat(e.target.value))
                  }
                />
                <label htmlFor="growthfactor">Growth Factor</label>
              </span>
            </p>
            <h5>Environmental Constant</h5>
            <p className="m-0">
              <span className="p-float-label">
                <InputText
                  id="environmentalConstant"
                  type="text"
                  value={`${environmentalConstant}`}
                  onChange={(e) =>
                    setEnvironmentalConstant(parseFloat(e.target.value))
                  }
                />
                <label htmlFor="environmentalConstant">
                  Environmental Constant
                </label>
              </span>
            </p>
            <h5>Wood Density Constant</h5>
            <p className="m-0">
              <span className="p-float-label">
                <InputText
                  id="woodDensityConstant"
                  type="text"
                  value={`${woodDensityConstant}`}
                  onChange={(e) =>
                    setWoodDensityConstant(parseFloat(e.target.value))
                  }
                />
                <label htmlFor="woodDensityConstant">
                  Environmental Constant
                </label>
              </span>
            </p>
          </Panel>
          <DataTable
            value={formulae}
            selectionMode="multiple"
            selection={selectedFormulae}
            onSelectionChange={(event) => {
              if (Array.isArray(event.value)) {
                setSelectedFormulae(event.value);
              }
            }}
            dataKey="id"
          >
            <Column
              header="Name"
              body={(formula: EnumFormulaItem) => (
                <b>{"" + calculateName(formula)}</b>
              )}
            ></Column>
            <Column
              header="Formula"
              body={(formula: EnumFormulaItem) => (
                <Latex>{formula.formulaTxt}</Latex>
              )}
            ></Column>
            <Column
              header="Edit"
              body={(formula: EnumFormulaItem) => (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                />
              )}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* RESULT : GRAPH DISPLAY */}
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">
            Graph Comparison
          </div>
          <div className="text-500 mb-5">
            these are the graphs of Above Ground Biomass (AGB) formula
          </div>

          <div className="card">
            <Chart type="line" data={lineData}></Chart>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyPage;
