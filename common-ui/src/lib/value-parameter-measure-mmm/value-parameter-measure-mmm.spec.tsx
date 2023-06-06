import { render } from '@testing-library/react';

import ValueParameterMeasureMMM from './value-parameter-measure-mmm';

describe('ValueParameterMeasureMMM', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValueParameterMeasureMMM />);
    expect(baseElement).toBeTruthy();
  });
});
