import styles from './parameters-wind-speed.module.css';

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import ValueParameterLevelMeters from '../value-parameter-level-meters/value-parameter-level-meters';
import { useEffect, useState } from 'react';
import ValueParameterUnitSpeed from '../value-parameter-unit-speed/value-parameter-unit-speed';
import { buildWeatherParameterStringSpeed } from '@fedevela-vntr-case/api';

export interface ParametersWindSpeedProps {
  setWeatherParameterStringValue: (psv: string) => void;
  setShouldDisableNextButton: (sdnb: boolean) => void;
  shouldDisableNextButton: boolean;
  setWeatherParameteUnits: (wpu: string) => void;
  toast: any;
}

export function ParametersWindSpeed(props: ParametersWindSpeedProps) {
  const {
    setWeatherParameterStringValue,
    setShouldDisableNextButton,
    setWeatherParameteUnits,
    shouldDisableNextButton,
    toast,
  } = props;
  const [parameterStringValueSpeed, setParameterStringValueSpeed] =
    useState<string>('');
  const [levelMetersVP, setLevelMetersVP] = useState<string>('');
  const [unitSpeedVP, setUnitSpeedVP] = useState<string>('');

  useEffect(() => {
    setWeatherParameterStringValue(parameterStringValueSpeed);
  }, [setWeatherParameterStringValue, parameterStringValueSpeed]);

  useEffect(() => {
    if (levelMetersVP !== '' && unitSpeedVP !== '') {
      setParameterStringValueSpeed(
        buildWeatherParameterStringSpeed(levelMetersVP, unitSpeedVP)
      );
      setWeatherParameteUnits(unitSpeedVP);
      if (shouldDisableNextButton)
        toast.current.show({
          severity: 'success',
          summary: 'Weather Parameter Configured!',
          detail: 'The wind speed parameter has been configured.',
        });
      setShouldDisableNextButton(false);
    }
  }, [
    setParameterStringValueSpeed,
    setShouldDisableNextButton,
    setWeatherParameteUnits,
    shouldDisableNextButton,
    levelMetersVP,
    unitSpeedVP,
    toast,
  ]);

  return (
    <div className={styles['container']}>
      <Card>
        <ValueParameterLevelMeters setValueParameter={setLevelMetersVP} />
        <Divider />
        <ValueParameterUnitSpeed setValueParameter={setUnitSpeedVP} />
      </Card>
    </div>
  );
}

export default ParametersWindSpeed;
