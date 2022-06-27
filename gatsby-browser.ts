/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
import type { GatsbyBrowser } from 'gatsby';

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
  () => {
    const loaderIframe = document.getElementById('___loader');
    // close loading
    if (loaderIframe) {
      setTimeout(() => {
        loaderIframe.style.opacity = '0';
      }, 0);

      if (
        !Boolean(window?.localStorage.getItem('SCENE')) ||
        Boolean(window?.localStorage.getItem('SKIP'))
      ) {
        loaderIframe.style.display = 'none';
      } else {
        setTimeout(() => {
          loaderIframe.style.display = 'none';
        }, 300);
      }
    }
  };

/**pwa update notice */
// export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] =
//   () => {
//     const answer = window.confirm(
//       `This application has been updated. ` +
//         `Reload to display the latest version?`
//     );
//     if (answer === true) {
//       window.location.reload();
//     }
//   };
