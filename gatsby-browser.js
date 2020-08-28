import React from 'react';
import 'typeface-montserrat';
import 'typeface-merriweather';
import './src/assets/theme/prism-costom.css';
import './src/assets/theme/prism-line-number-custom.css';

import GlobalLayout from './src/layout/GlobalLayout';

export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = 0;
  }, 600);
  setTimeout(function () {
    document.getElementById('___loader').style.display = 'none';
  }, 1000);
};

export const wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>;
};
