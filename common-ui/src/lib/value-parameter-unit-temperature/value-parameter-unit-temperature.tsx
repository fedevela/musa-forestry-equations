/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './value-parameter-unit-temperature.module.css';
import { useEffect, useState } from 'react';

import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { IListBoxItem, IValueParameterProps } from '../common-ui';

export function ValueParameterUnitTemperature(props: IValueParameterProps) {
  const { setValueParameter } = props;

  const [valueUnitTemperature, setValueUnitTemperature] = useState<string>('');

  const availableUnitsTemperature: IListBoxItem[] = [
    { name: 'C', code: 'C' },
    { name: 'F', code: 'F' },
    { name: 'K', code: 'K' },
  ];

  useEffect(() => {
    setValueParameter(valueUnitTemperature);
  }, [valueUnitTemperature, setValueParameter]);

  return (
    <div className="field">
      <label>Unit: </label>
      <SelectButton
        value={valueUnitTemperature}
        onChange={(e: SelectButtonChangeEvent) => {
          setValueUnitTemperature(e.value);
        }}
        options={availableUnitsTemperature}
        optionLabel="name"
        optionValue="code"
        className="w-full"
      />
    </div>
  );
}

export default ValueParameterUnitTemperature;
