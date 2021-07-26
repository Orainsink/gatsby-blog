import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import Bg from './index';
import renderWithRedux from '../../redux/renderWithRedux';

afterEach(cleanup);

it('initial place', () => {
  const { getByTestId } = renderWithRedux(<Bg />);

  expect(getByTestId('bg').style.top).toBe('100vh');
});

it('scroll to top', () => {
  const { getByTestId } = renderWithRedux(<Bg />, { scene: false });

  expect(getByTestId('bg').style.top).toBe('0px');
});
