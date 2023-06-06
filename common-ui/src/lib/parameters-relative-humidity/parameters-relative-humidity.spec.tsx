import { render } from '@testing-library/react';

import ParametersRelativeHumidity from './parameters-relative-humidity';

describe('ParametersRelativeHumidity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParametersRelativeHumidity />);
    expect(baseElement).toBeTruthy();
  });
});
