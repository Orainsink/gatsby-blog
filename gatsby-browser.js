/**Called when the initial (but not subsequent) render of Gatsby App is done on the client. */
const onInitialClientRender = () => {
  // close loading
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = 0;
  }, 0);
  setTimeout(function () {
    document.getElementById('___loader').style.display = 'none';
  }, 300);
};

module.exports = {
  onInitialClientRender,
};
