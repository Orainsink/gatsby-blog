/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
import type { GatsbyBrowser } from 'gatsby';
import { RecoilRoot } from 'recoil';

import { closePageLoader } from './src/utils/closePageLoader';
import { scrollToAnchor } from './src/utils/scrollToAnchor';

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
  () => {
    closePageLoader();
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
