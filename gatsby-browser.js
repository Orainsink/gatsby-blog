import React from 'react';
import 'typeface-montserrat';
import 'typeface-merriweather';
import './src/assets/theme/prism-costom.css';
import './src/assets/theme/prism-line-number-custom.css';

import GlobalLayout from './src/layout/GlobalLayout';

export const wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>;
};
