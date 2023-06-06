import { render } from '@testing-library/react';

import ChooseWeatherParameters from './choose-weather-parameters';

describe('ChooseWeatherParameters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChooseWeatherParameters />);
    expect(baseElement).toBeTruthy();
  });
});
