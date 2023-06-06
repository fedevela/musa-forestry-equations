import { render } from '@testing-library/react';

import MenuSteps from './menu-steps';

describe('MenuSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MenuSteps />);
    expect(baseElement).toBeTruthy();
  });
});
