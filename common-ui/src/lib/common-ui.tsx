import { PrimeIcons } from 'primereact/api';

export const LEVEL_METERS_MIN = 2;
export const LEVEL_METERS_MAX = 20000;
export const DATE_ZERO = new Date(0);

export interface IListBoxItem {
  name: string;
  code: string;
  icon?: string;
}

export interface IMeteomaticsAPIDateValue {
  date: string;
  value: number;
}

export interface IGraphDataPoint {
  year: number;
  month: number;
  date: number;
  hour: number;
  value: number;
  ymdLabel?: string;
  hLabel?: string;
}

export interface IKeyValueMap {
  [key: string]: any;
}

export interface IGroupedValuesMap {
  [key: string]: number[];
}

export interface IValueParameterProps {
  setValueParameter: (vp: string) => void;
}

export const checkDateIsNotZero = (aDate: Date) =>
  aDate.toUTCString() !== DATE_ZERO.toUTCString();

export const createArray24HLabels = () => {
  return new Array(24).fill(0).map((_, i) => `${i}h`);
};

export const itemTemplateWithIcon = (option: IListBoxItem) => {
  return (
    <>
      <i className={option.icon}></i>
      <span>&nbsp;{option.name}</span>
    </>
  );
};

export const weatherParametersKV: IKeyValueMap = {
  temperature: {
    name: 'Temperature',
    code: 'temperature',
    icon: PrimeIcons.SUN,
  },
  wind_speed: {
    name: 'Wind Speed',
    code: 'wind_speed',
    icon: PrimeIcons.IMAGE,
  },
  relative_humidity: {
    name: 'Relative Humidity',
    code: 'relative_humidity',
    icon: PrimeIcons.SORT_ALT,
  },
};
