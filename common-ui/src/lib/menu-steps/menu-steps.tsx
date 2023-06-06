/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './menu-steps.module.css';

import { useState, useRef, useEffect } from 'react';

import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { PrimeIcons } from 'primereact/api';

import ChooseLocation from '../choose-location/choose-location';
import ChooseDateTimeRange from '../choose-date-time-range/choose-date-time-range';

import ChooseWeatherParameters from '../choose-weather-parameters/choose-weather-parameters';
import ChooseGraphPlotType from '../choose-graph-plot-type/choose-graph-plot-type';
import { IKeyValueMap } from '../common-ui';

export interface MenuStepsProps {
  setGraphPlotType: (gpt: string) => void;
  setWeatherParameterStringValue: (psv: string) => void;
  setStartDate: (sd: Date) => void;
  setEndDate: (ed: Date) => void;
  onChangeAddressComponents: (acs: IKeyValueMap[]) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setWeatherParameteUnits: (wpu: string) => void;
  setWeatherParameterCode: (git: string) => void;
  setShouldDisplayGraph: (ssdg: boolean) => void;
  setShouldRefreshGraph: (ssrg: boolean) => void;
  weatherParameterCode: string;
  addressComponents: IKeyValueMap[];
  toast: any;
  startDate: Date;
  endDate: Date;
}

export function MenuSteps(props: MenuStepsProps) {
  const {
    setLatitude,
    setLongitude,
    onChangeAddressComponents,
    setStartDate,
    setEndDate,
    setWeatherParameterStringValue,
    setGraphPlotType,
    setWeatherParameterCode,
    setWeatherParameteUnits,
    setShouldDisplayGraph,
    setShouldRefreshGraph,
    weatherParameterCode,
    addressComponents,
    toast,
    startDate,
    endDate,
  } = props;
  const [shouldDisableNextButton, setShouldDisableNextButton] =
    useState<boolean>(true);
  const [shouldDisableGraphButton, setShouldDisableGraphButton] =
    useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem = [
    {
      label: 'Location',
      icon: PrimeIcons.COMPASS,
      disabled: false,
    },
    {
      label: 'Date and Time',
      icon: PrimeIcons.CALENDAR,
      disabled: activeIndex < 1,
    },
    {
      label: 'Weather Parameters',
      icon: PrimeIcons.BOLT,
      disabled: activeIndex < 2,
    },
    {
      label: 'Graph Type',
      icon: PrimeIcons.MAP,
      disabled: activeIndex < 3,
    },
  ];

  return (
    <div className={styles['container']}>
      <Steps
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => {
          setActiveIndex(e.index);
          setShouldDisableGraphButton(true);
          setShouldDisplayGraph(false);
        }}
        readOnly={false}
      />
      <Divider />
      <Card>
        {(() => {
          switch (activeIndex) {
            case 0:
              return (
                <ChooseLocation
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  onChangeAddressComponents={onChangeAddressComponents}
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  addressComponents={addressComponents}
                  toast={toast}
                />
              );
            case 1:
              return (
                <ChooseDateTimeRange
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  startDate={startDate}
                  endDate={endDate}
                  toast={toast}
                />
              );
            case 2:
              return (
                <ChooseWeatherParameters
                  setWeatherParameterStringValue={
                    setWeatherParameterStringValue
                  }
                  setShouldDisableNextButton={setShouldDisableNextButton}
                  shouldDisableNextButton={shouldDisableNextButton}
                  setWeatherParameteUnits={setWeatherParameteUnits}
                  setWeatherParameterCode={setWeatherParameterCode}
                  weatherParameterCode={weatherParameterCode}
                  toast={toast}
                />
              );
            case 3:
              return (
                <ChooseGraphPlotType
                  setGraphPlotType={setGraphPlotType}
                  setShouldDisableGraphButton={setShouldDisableGraphButton}
                />
              );
            default:
              return <div>NULL</div>;
          }
        })()}

        <Divider />
        <div className="formgrid grid">
          <div className="field col">
            <div className="card flex justify-content-center"></div>
          </div>
          <div className="field col">
            <div className="card flex justify-content-center">
              {activeIndex < 3 && (
                <Button
                  disabled={shouldDisableNextButton}
                  label="Next"
                  icon="pi pi-forward"
                  iconPos="right"
                  severity="info"
                  onClick={() => {
                    setActiveIndex(activeIndex + 1);
                    setShouldDisableNextButton(true);
                  }}
                />
              )}
              {activeIndex === 3 && (
                <Button
                  disabled={shouldDisableGraphButton}
                  label="Show Graph!"
                  icon="pi pi-check"
                  iconPos="right"
                  severity="success"
                  onClick={() => {
                    setShouldDisplayGraph(true);
                    setShouldRefreshGraph(true);
                    setShouldDisableGraphButton(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MenuSteps;
