/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './parameters-relative-humidity.module.css';
import { useEffect, useState } from 'react';

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import { buildWeatherParameterStringRelativeHumidity } from '@fedevela-vntr-case/api';
import ValueParameterLevelMeters from '../value-parameter-level-meters/value-parameter-level-meters';
import ValueParameterMeasureMMM from '../value-parameter-measure-mmm/value-parameter-measure-mmm';

export interface ParametersRelativeHumidityProps {
  setWeatherParameterStringValue: (psv: string) => void;
  setShouldDisableNextButton: (sdnb: boolean) => void;
  setWeatherParameteUnits: (wpu: string) => void;
  shouldDisableNextButton: boolean;
  toast: any;
}

export function ParametersRelativeHumidity(
  props: ParametersRelativeHumidityProps
) {
  const {
    setWeatherParameterStringValue,
    setShouldDisableNextButton,
    setWeatherParameteUnits,
    shouldDisableNextButton,
    toast,
  } = props;
  const [
    parameterStringValueRelativeHumidity,
    setParameterStringValueRelativeHumidity,
  ] = useState<string>('');

  const [levelMetersVP, setLevelMetersVP] = useState<string>('');
  const [measureMMMVP, setMeasureMMMVP] = useState<string>('');

  useEffect(() => {
    setWeatherParameterStringValue(parameterStringValueRelativeHumidity);
  }, [setWeatherParameterStringValue, parameterStringValueRelativeHumidity]);

  useEffect(() => {
    if (levelMetersVP !== '' && measureMMMVP !== '') {
      setParameterStringValueRelativeHumidity(
        buildWeatherParameterStringRelativeHumidity(measureMMMVP, levelMetersVP)
      );
      setWeatherParameteUnits('%');
      if (shouldDisableNextButton)
        toast.current.show({
          severity: 'success',
          summary: 'Weather Parameter Configured!',
          detail: 'The relative humidity parameter has been configured.',
        });
      setShouldDisableNextButton(false);
    }
  }, [
    setParameterStringValueRelativeHumidity,
    setShouldDisableNextButton,
    setWeatherParameteUnits,
    shouldDisableNextButton,
    levelMetersVP,
    measureMMMVP,
    toast,
  ]);

  return (
    <div className={styles['container']}>
      <Card>
        <ValueParameterLevelMeters setValueParameter={setLevelMetersVP} />
        <Divider />
        <ValueParameterMeasureMMM setValueParameter={setMeasureMMMVP} />
      </Card>
    </div>
  );
}

export default ParametersRelativeHumidity;
