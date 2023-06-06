import { render } from '@testing-library/react';

import ParametersTemperature from './parameters-temperature';

describe('ParametersTemperature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParametersTemperature />);
    expect(baseElement).toBeTruthy();
  });
});
