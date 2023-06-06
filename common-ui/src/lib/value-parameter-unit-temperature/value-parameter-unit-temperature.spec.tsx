import { render } from '@testing-library/react';

import ValueParameterUnitTemperature from './value-parameter-unit-temperature';

describe('ValueParameterUnitTemperature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValueParameterUnitTemperature />);
    expect(baseElement).toBeTruthy();
  });
});
