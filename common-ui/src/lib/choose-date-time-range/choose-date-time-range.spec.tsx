import { render } from '@testing-library/react';

import ChooseDateTimeRange from './choose-date-time-range';

describe('ChooseDateTimeRange', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChooseDateTimeRange />);
    expect(baseElement).toBeTruthy();
  });
});
