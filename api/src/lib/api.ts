import axios from 'axios';

export const INTERVAL_1H = '1h';
export const INTERVAL_P_1H = 'PT1H';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: 'dramaclub_estefenn',
    password: '9bTiH87Ztb',
  },
  responseType: 'json',
});

export const executeRequestMeteomaticsAPI = async (meteomaticsURL: string) =>
  Promise.resolve(axiosInstance.post(meteomaticsURL));

export const buildMeteomaticsURL = (
  startTime: string,
  endTime: string,
  weatherParameter: string,
  latitude: string,
  longitude: string
) =>
  `https://corsproxy.io/?https://api.meteomatics.com/${startTime}--${endTime}:${INTERVAL_P_1H}/${weatherParameter}/${latitude},${longitude}/json?model=mix`;

export const buildWeatherParameterStringTemperature = (
  measureMMMVP: string,
  levelMetersVP: string,
  unitTemperatureVP: string
) => `t_${measureMMMVP}_${levelMetersVP}m_${INTERVAL_1H}:${unitTemperatureVP}`;

export const buildWeatherParameterStringSpeed = (
  levelMetersVP: string,
  unitSpeedVP: string
) => `wind_speed_mean_${levelMetersVP}m_${INTERVAL_1H}:${unitSpeedVP}`;

export const buildWeatherParameterStringRelativeHumidity = (
  measureMMMVP: string,
  levelMetersVP: string
) => `relative_humidity_${measureMMMVP}_${levelMetersVP}m_${INTERVAL_1H}:p`;
