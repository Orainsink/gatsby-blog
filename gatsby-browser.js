/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
const onInitialClientRender = () => {
  const loaderIframe = document.getElementById('___loader');
  // close loading
  if (loaderIframe) {
    setTimeout(function () {
      loaderIframe.style.opacity = '0';
    }, 0);

    if (
      !Boolean(window?.localStorage.getItem('SCENE')) ||
      Boolean(window?.localStorage.getItem('SKIP'))
    ) {
      loaderIframe.style.display = 'none';
    } else {
      setTimeout(function () {
        loaderIframe.style.display = 'none';
      }, 300);
    }
  }
};
/**pwa update notice */
// const onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `This application has been updated. ` +
//       `Reload to display the latest version?`
//   );
//   if (answer === true) {
//     window.location.reload();
//   }
// };

module.exports = {
  onInitialClientRender,
  // onServiceWorkerUpdateReady,
};
