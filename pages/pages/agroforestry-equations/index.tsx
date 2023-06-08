import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import Latex from "react-latex";
import { v4 as uuidv4 } from "uuid";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

const EmptyPage = () => {
  interface EnumFormulaItem {
    name: string;
    forestType: string;
    rainfall: string;
    formulaTxt: string;
    id: number;
    checked: boolean;
  }

  interface EnumFormulaItems extends Array<EnumFormulaItem> {}

  const formulaeJSON: EnumFormulaItem[] = [
    {
      name: "Chave 2014",
      forestType: "All",
      rainfall: "",
      formulaTxt:
        "AGB = exp[-1.803 - 0.976 × E + 0.976 × ln(ρ) + 2.673 × ln(dbh) - 0.0299 × [ln(dbh)]^2]",
      id: 0,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "dry",
      rainfall: "<1500",
      formulaTxt:
        "AGB = ρ × exp[-0.667 + 1.784 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      id: 1,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "moist",
      rainfall: "1500-3500",
      formulaTxt:
        "AGB = ρ × exp[-1.499 + 2.148 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      id: 2,
      checked: true,
    },
    {
      name: "Chave 2005",
      forestType: "wet",
      rainfall: ">3500",
      formulaTxt:
        "AGB = ρ × exp[-1.239 + 1.980 × ln(dbh) + 0.207 × [ln(dbh)]^2 - 0.0281 × [ln(dbh)]^3]",
      id: 3,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "dry",
      rainfall: "700-900",
      formulaTxt: "AGB = 10^(-0.535 + log10(BA))",
      id: 4,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "dry",
      rainfall: "900-1500",
      formulaTxt: "AGB = 0.2035 × dbh^2.3196",
      id: 5,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "moist",
      rainfall: "1500-4000",
      formulaTxt: "AGB = exp[-2.289 + 2.649 × ln(dbh) - 0.021 × [ln(dbh)]^2]",
      id: 6,
      checked: true,
    },
    {
      name: "Brown",
      forestType: "wet",
      rainfall: ">4000",
      formulaTxt: "AGB = 21.297 - 6.953 × dbh + 0.740 × dbh^",
      id: 7,
      checked: true,
    },
  ];

  const [formulae, setFormulae] = useState<EnumFormulaItem[]>(formulaeJSON);
  const [selectedFormulae, setSelectedFormulae] = useState<EnumFormulaItem[]>(
    formulaeJSON.filter((f) => f.checked)
  );

  return (
    <>
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
      <div className="card mb-0">
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">
            Formula Selection
          </div>
          <div className="text-500 mb-5">
            these are the available Above Ground Biomass (AGB) formulae
          </div>
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
              body={(formula: EnumFormulaItem) =>
                formula.name + " " + formula.forestType + " " + formula.rainfall
                  ? formula.rainfall + "(mm)"
                  : ""
              }
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
    </>
  );
};

export default EmptyPage;
