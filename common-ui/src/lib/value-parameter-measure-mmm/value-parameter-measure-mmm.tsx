/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './value-parameter-measure-mmm.module.css';
import { useEffect, useState } from 'react';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { IListBoxItem, IValueParameterProps } from '../common-ui';

export function ValueParameterMeasureMMM(props: IValueParameterProps) {
  const { setValueParameter } = props;

  const [valueMeasureMMM, setValueMeasureMMM] = useState<string>('');

  const availableMeasuresMMM: IListBoxItem[] = [
    { name: 'Min', code: 'min' },
    { name: 'Mean', code: 'mean' },
    { name: 'Max', code: 'max' },
  ];

  useEffect(() => {
    setValueParameter(valueMeasureMMM);
  }, [valueMeasureMMM, setValueParameter]);

  return (
    <div className="field">
      <label>Measure: </label>
      <SelectButton
        value={valueMeasureMMM}
        onChange={(e: SelectButtonChangeEvent) => setValueMeasureMMM(e.value)}
        options={availableMeasuresMMM}
        optionLabel="name"
        optionValue="code"
        className="w-full"
      />
    </div>
  );
}

export default ValueParameterMeasureMMM;
