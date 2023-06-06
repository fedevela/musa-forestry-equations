import { render } from '@testing-library/react';

import DisplayGraphTypeChartJS from './display-graph-type-chart-js';

describe('DisplayGraphTypeChartJS', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DisplayGraphTypeChartJS />);
    expect(baseElement).toBeTruthy();
  });
});
