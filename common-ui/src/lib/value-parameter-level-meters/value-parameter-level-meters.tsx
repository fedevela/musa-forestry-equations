/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './value-parameter-level-meters.module.css';
import { useEffect, useState } from 'react';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { LEVEL_METERS_MAX, LEVEL_METERS_MIN, IValueParameterProps } from '../common-ui';

export function ValueParameterLevelMeters(
  props: IValueParameterProps
) {
  const { setValueParameter } = props;

  const [valueLevelMeters, setValueLevelMeters] = useState<number>(1000);

  useEffect(() => {
    setValueParameter(valueLevelMeters.toString());
  }, [valueLevelMeters, setValueParameter]);

  return (
    <div className="field">
      <label>Height (Meters): {valueLevelMeters} m</label>
      <Slider
        value={valueLevelMeters}
        onChange={(e: SliderChangeEvent) => setValueLevelMeters(e.value)}
        min={LEVEL_METERS_MIN}
        max={LEVEL_METERS_MAX}
        className="w-full"
      />
    </div>
  );
}

export default ValueParameterLevelMeters;
