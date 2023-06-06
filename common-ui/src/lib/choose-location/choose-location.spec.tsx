import { render } from '@testing-library/react';

import ChooseLocation from './choose-location';

describe('ChooseLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChooseLocation />);
    expect(baseElement).toBeTruthy();
  });
});
