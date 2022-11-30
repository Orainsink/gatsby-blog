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

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({ location }) => {
  const anchor = decodeURI(location.hash.split('#')[1]?.toLowerCase());
  const element = document.getElementById(anchor);

  if (element) {
    document.body.scrollTo({
      top: element.offsetTop,
      left: 0,
    });
  } else {
    document.body.scrollTo(0, 0);
  }
};
