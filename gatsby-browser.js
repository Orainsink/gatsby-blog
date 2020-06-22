// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
import 'prismjs/themes/prism.css';
import ReactDOM from 'react-dom';

import GlobalLayout from './src/layout/GlobalLayout';
import { loadableReady } from '@loadable/component';

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback);
    });
  };
};
export const wrapPageElement = GlobalLayout;
