import { render } from '@testing-library/react';

import DisplayGraphTypeHeatmap from './display-graph-type-heatmap';

describe('DisplayGraphTypeHeatmap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DisplayGraphTypeHeatmap />);
    expect(baseElement).toBeTruthy();
  });
});
