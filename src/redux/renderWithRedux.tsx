import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState, reducer } from './store';
import { createStore } from 'redux';

/**
 *
 * @param component React component
 * @returns
 */

const renderWithRedux = (component: React.ReactElement, iniState?: any) => {
  const store = createStore(reducer, iniState ?? initialState);

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
export default renderWithRedux;
