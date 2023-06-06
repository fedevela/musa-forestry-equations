import { render } from '@testing-library/react';

import ValueParameterLevelMeters from './value-parameter-level-meters';

describe('ValueParameterLevelMeters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValueParameterLevelMeters />);
    expect(baseElement).toBeTruthy();
  });
});
