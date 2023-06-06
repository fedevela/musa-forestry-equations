import styles from './value-parameter-unit-speed.module.css';
import { useEffect, useState } from 'react';

import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { IListBoxItem, IValueParameterProps } from '../common-ui';

export function ValueParameterUnitSpeed(props: IValueParameterProps) {
  const { setValueParameter } = props;

  const [valueUnitSpeed, setValueUnitSpeed] = useState<string>('');

  useEffect(() => {
    setValueParameter(valueUnitSpeed);
  }, [valueUnitSpeed, setValueParameter]);

  const availableUnitsSpeed: IListBoxItem[] = [
    { name: 'bft', code: 'bft' },
    { name: 'kmh', code: 'kmh' },
    { name: 'kn', code: 'kn' },
    { name: 'ms', code: 'ms' },
    { name: 'mph', code: 'mph' },
  ];

  return (
    <div className="field">
      <label>Unit: </label>
      <SelectButton
        value={valueUnitSpeed}
        onChange={(e: SelectButtonChangeEvent) => {
          setValueUnitSpeed(e.value);
        }}
        options={availableUnitsSpeed}
        optionLabel="name"
        optionValue="code"
        className="w-full"
      />
    </div>
  );
}

export default ValueParameterUnitSpeed;
