import { render } from '@testing-library/react';

import ValueParameterUnitSpeed from './value-parameter-unit-speed';

describe('ValueParameterUnitSpeed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValueParameterUnitSpeed />);
    expect(baseElement).toBeTruthy();
  });
});
