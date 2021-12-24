/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
const onInitialClientRender = () => {
  // close loading
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = 0;
  }, 0);

  if (
    !Boolean(window?.localStorage.getItem('SCENE')) ||
    Boolean(window?.localStorage.getItem('SKIP'))
  ) {
    document.getElementById('___loader').style.display = 'none';
  } else {
    setTimeout(function () {
      document.getElementById('___loader').style.display = 'none';
    }, 300);
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
