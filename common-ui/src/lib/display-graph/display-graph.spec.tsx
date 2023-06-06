import { render } from '@testing-library/react';

import DisplayGraph from './display-graph';

describe('DisplayGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DisplayGraph />);
    expect(baseElement).toBeTruthy();
  });
});
