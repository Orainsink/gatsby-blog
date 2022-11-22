/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
import type { GatsbyBrowser } from 'gatsby';
import { RecoilRoot } from 'recoil';

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
  };

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
