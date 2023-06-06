/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './choose-weather-parameters.module.css';

import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Divider } from 'primereact/divider';

import ParametersTemperature from '../parameters-temperature/parameters-temperature';
import {
  weatherParametersKV,
  IListBoxItem,
  itemTemplateWithIcon,
} from '../common-ui';
import ParametersWindSpeed from '../parameters-wind-speed/parameters-wind-speed';
import ParametersRelativeHumidity from '../parameters-relative-humidity/parameters-relative-humidity';

export interface ChooseWeatherParametersProps {
  setWeatherParameterStringValue: (psv: string) => void;
  setShouldDisableNextButton: (sdnb: boolean) => void;
  setWeatherParameterCode: (git: string) => void;
  setWeatherParameteUnits: (wpu: string) => void;
  weatherParameterCode: string;
  shouldDisableNextButton: boolean;
  toast: any;
}

export function ChooseWeatherParameters(props: ChooseWeatherParametersProps) {
  const {
    setWeatherParameterStringValue,
    setShouldDisableNextButton,
    setWeatherParameterCode,
    setWeatherParameteUnits,
    weatherParameterCode,
    shouldDisableNextButton,
    toast,
  } = props;

  const availableWeatherParameterTypes: IListBoxItem[] = [
    ...Object.values(weatherParametersKV),
  ];

  return (
    <div className={styles['container']}>
      <h3>Please choose the parameter you wish to see:</h3>

      <SelectButton
        value={weatherParameterCode}
        onChange={(e: SelectButtonChangeEvent) => {
          setWeatherParameterCode(e.value);
          toast.current.show({
            severity: 'success',
            summary: 'Weather Parameter Chosen!',
            detail: weatherParametersKV[e.value].name,
          });
        }}
        options={availableWeatherParameterTypes}
        itemTemplate={itemTemplateWithIcon}
        optionLabel="name"
        optionValue="code"
        className="w-full"
      />
      {(() => {
        switch (weatherParameterCode) {
          case weatherParametersKV.temperature.code:
            return (
              <>
                <Divider />
                <ParametersTemperature
                  setWeatherParameterStringValue={
                    setWeatherParameterStringValue
                  }
                  setWeatherParameteUnits={setWeatherParameteUnits}
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  shouldDisableNextButton={shouldDisableNextButton}
                  toast={toast}
                />
              </>
            );
          case weatherParametersKV.wind_speed.code:
            return (
              <>
                <Divider />
                <ParametersWindSpeed
                  setWeatherParameterStringValue={
                    setWeatherParameterStringValue
                  }
                  setWeatherParameteUnits={setWeatherParameteUnits}
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  shouldDisableNextButton={shouldDisableNextButton}
                  toast={toast}
                />
              </>
            );
          case weatherParametersKV.relative_humidity.code:
            return (
              <>
                <Divider />
                <ParametersRelativeHumidity
                  setWeatherParameterStringValue={
                    setWeatherParameterStringValue
                  }
                  setWeatherParameteUnits={setWeatherParameteUnits}
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  shouldDisableNextButton={shouldDisableNextButton}
                  toast={toast}
                />
              </>
            );
        }
      })()}
    </div>
  );
}

export default ChooseWeatherParameters;
