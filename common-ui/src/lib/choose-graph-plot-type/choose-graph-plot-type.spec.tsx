import { render } from '@testing-library/react';

import ChooseGraphPlotType from './choose-graph-plot-type';

describe('ChooseGraphPlotType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChooseGraphPlotType />);
    expect(baseElement).toBeTruthy();
  });
});
