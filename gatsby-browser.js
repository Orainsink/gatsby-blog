// custom typefaces
import React from 'react';
import 'typeface-montserrat';
import 'typeface-merriweather';
import './src/assets/theme/prism-costom.css';
import './src/assets/theme/prism-line-number-custom.css';
import ReactDOM from 'react-dom';
//margin: 1em
import GlobalLayout from './src/layout/GlobalLayout';
import { loadableReady } from '@loadable/component';

export const wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>;
};

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback);
    });
  };
};
