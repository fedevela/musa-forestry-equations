import styles from './display-graph.module.css';
import { Card } from 'primereact/card';
import DisplayGraphTypeHeatmap from '../display-graph-type-heatmap/display-graph-type-heatmap';
import DisplayGraphTypeChartJS from '../display-graph-type-chart-js/display-graph-type-chart-js';
import {
  IMeteomaticsAPIDateValue,
  IGraphDataPoint,
  weatherParametersKV,
} from '../common-ui';

export interface DisplayGraphProps {
  graphPlotType: string;
  weatherParameterCode: string;
  weatherParameterUnits: string;
  locationName: string;
  meteomaticsAPIDateValues: IMeteomaticsAPIDateValue[];
}

export function DisplayGraph(props: DisplayGraphProps) {
  const {
    graphPlotType,
    meteomaticsAPIDateValues,
    weatherParameterCode,
    weatherParameterUnits,
    locationName,
  } = props;
  const graphDataPoints: IGraphDataPoint[] = meteomaticsAPIDateValues.map(
    (madv) => {
      const dvDate = new Date(madv.date);
      const dataValuePoint: IGraphDataPoint = {
        year: dvDate.getUTCFullYear(),
        month: dvDate.getUTCMonth() + 1,
        date: dvDate.getUTCDate(),
        hour: dvDate.getUTCHours(),
        value: madv.value,
      };
      dataValuePoint.ymdLabel = `${dataValuePoint.year}/${dataValuePoint.month}/${dataValuePoint.date}`;
      dataValuePoint.hLabel = `${dataValuePoint.hour}h`;

      return dataValuePoint;
    }
  );

  return (
    <div className={styles['container']}>
      <Card>
        <h3>
          {weatherParametersKV[weatherParameterCode].name} ({weatherParameterUnits}) at {locationName}
        </h3>
        {(() => {
          switch (graphPlotType) {
            case 'heatmap':
              return (
                <DisplayGraphTypeHeatmap graphDataPoints={graphDataPoints} />
              );
            case 'line':
            case 'bar':
              return (
                <DisplayGraphTypeChartJS
                  graphDataPoints={graphDataPoints}
                  graphPlotType={graphPlotType}
                />
              );
          }
        })()}
      </Card>
    </div>
  );
}

export default DisplayGraph;
