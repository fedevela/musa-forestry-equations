/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.module.css';

import { Toast } from 'primereact/toast';
import {
  buildMeteomaticsURL,
  executeRequestMeteomaticsAPI,
} from '@fedevela-vntr-case/api';
import {
  IMeteomaticsAPIDateValue,
  IKeyValueMap,
  DisplayGraph,
  MenuSteps,
  DATE_ZERO,
} from '@fedevela-vntr-case/common-ui';
import { useEffect, useRef, useState } from 'react';

export function App() {
  const toast = useRef(null);
  const [shouldDisplayGraph, setShouldDisplayGraph] = useState(false);
  const [shouldRefreshGraph, setShouldRefreshGraph] = useState(false);
  const [weatherParameterCode, setWeatherParameterCode] = useState('');
  const [weatherParameterUnits, setWeatherParameteUnits] = useState('');
  const [graphPlotType, setGraphPlotType] = useState('');
  const [startDate, setStartDate] = useState(DATE_ZERO);
  const [endDate, setEndDate] = useState(DATE_ZERO);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [weatherParameterStringValue, setWeatherParameterStringValue] =
    useState<string>('');
  const [addressComponents, setAddressComponents] = useState<
    IKeyValueMap[] | []
  >([]);
  const [meteomaticsAPIDateValues, setMeteomaticsAPIDateValues] = useState<
    IMeteomaticsAPIDateValue[] | []
  >([]);

  const onChangeAddressComponents = (acs: IKeyValueMap[]) =>
    setAddressComponents([...acs]);

  useEffect(() => {
    if (shouldRefreshGraph) {
      const meteomaticsURL = buildMeteomaticsURL(
        startDate.toISOString(),
        endDate.toISOString(),
        weatherParameterStringValue,
        latitude.toLocaleString('en-US', { maximumFractionDigits: 7 }),
        longitude.toLocaleString('en-US', { maximumFractionDigits: 7 })
      );

      executeRequestMeteomaticsAPI(meteomaticsURL)
        .then(function (resultMeteomaticsAPIRaw) {
          setMeteomaticsAPIDateValues(
            resultMeteomaticsAPIRaw.data.data[0].coordinates[0].dates
          );

          toast.current.show({
            severity: 'success',
            summary: 'Meteomatics Query Successful',
            detail: `Fetched ${resultMeteomaticsAPIRaw.data.data[0].coordinates[0].dates.length} points of data.`,
            life: 3000,
          });
        })
        .catch(function (error) {
          console.error(error.response);
          toast.current.show({
            severity: 'error',
            summary: 'Error: ' + error.code,
            detail: error.response.data.message,
            life: 3000,
          });
          setShouldDisplayGraph(false);
        })
        .finally(() => setShouldRefreshGraph(false));
    }
  }, [
    endDate,
    latitude,
    longitude,
    startDate,
    weatherParameterStringValue,
    shouldRefreshGraph,
    setShouldRefreshGraph,
  ]);

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <MenuSteps
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        onChangeAddressComponents={onChangeAddressComponents}
        addressComponents={addressComponents}
        toast={toast}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        setWeatherParameterStringValue={setWeatherParameterStringValue}
        setGraphPlotType={setGraphPlotType}
        setWeatherParameteUnits={setWeatherParameteUnits}
        setWeatherParameterCode={setWeatherParameterCode}
        weatherParameterCode={weatherParameterCode}
        setShouldDisplayGraph={setShouldDisplayGraph}
        setShouldRefreshGraph={setShouldRefreshGraph}
      />
      {shouldDisplayGraph && (
        <DisplayGraph
          meteomaticsAPIDateValues={meteomaticsAPIDateValues}
          weatherParameterCode={weatherParameterCode}
          weatherParameterUnits={weatherParameterUnits}
          locationName={Object.values(addressComponents[0])[0]}
          graphPlotType={graphPlotType}
        />
      )}
    </>
  );
}

export default App;
