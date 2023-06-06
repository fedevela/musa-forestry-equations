/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './display-graph-type-heatmap.module.css';
import { HeatMapGrid } from 'react-grid-heatmap';

import { createArray24HLabels, IGraphDataPoint } from '../common-ui';

export interface DisplayGraphTypeHeatmapProps {
  graphDataPoints: IGraphDataPoint[];
}

export function DisplayGraphTypeHeatmap(props: DisplayGraphTypeHeatmapProps) {
  const { graphDataPoints } = props;

  const xLabels = createArray24HLabels();
  const yLabels = [...new Set(graphDataPoints.map((gdp) => gdp.ymdLabel))];
  const plotData = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(null));
  graphDataPoints.forEach((gdp: IGraphDataPoint) => {
    const xCoord = xLabels.indexOf(gdp.hLabel);
    const yCoord = yLabels.indexOf(gdp.ymdLabel);
    plotData[yCoord][xCoord] = gdp.value;
  });

  return (
    <div className={styles['container']}>
      <div
        style={{
          width: '100%',
        }}
      >
        <HeatMapGrid
          data={plotData}
          xLabels={xLabels}
          yLabels={yLabels}
          // Render cell with tooltip
          cellRender={(y, x, value) => {
            return (
              <div title={`${yLabels[y]} ${xLabels[x]} = ${value}`}>
                {value}
              </div>
            );
          }}
          xLabelsStyle={(index) => ({
            color: '#777',
            fontSize: '.8rem',
          })}
          yLabelsStyle={() => ({
            fontSize: '.7rem',
            textTransform: 'uppercase',
            color: '#777',
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `rgb(12, 160, 44, ${ratio})`,
            fontSize: '.8rem',
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.5})`,
          })}
          cellHeight="2rem"
          xLabelsPos="top"
          yLabelsPos="left"
          square
        />
      </div>
    </div>
  );
}

export default DisplayGraphTypeHeatmap;
