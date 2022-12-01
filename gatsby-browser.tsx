/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
import type { GatsbyBrowser } from 'gatsby';
import { RecoilRoot } from 'recoil';

import { scrollToAnchor } from './src/utils/scrollToAnchor';

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
  () => {
    const loaderIframe = document.getElementById('___loader');
    // close loading
    if (loaderIframe) {
      setTimeout(() => {
        loaderIframe.style.opacity = '0';
      }, 0);

      setTimeout(() => {
        loaderIframe.style.display = 'none';
      }, 300);
    }

    scrollToAnchor(window.location.hash);
  };

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({ location }) => {
  scrollToAnchor(location.hash);
};
