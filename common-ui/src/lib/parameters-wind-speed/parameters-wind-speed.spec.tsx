import { render } from '@testing-library/react';

import ParametersWindSpeed from './parameters-wind-speed';

describe('ParametersWindSpeed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParametersWindSpeed />);
    expect(baseElement).toBeTruthy();
  });
});
