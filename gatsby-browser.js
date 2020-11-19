/** close loading */
export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = 0;
  }, 0);
  setTimeout(function () {
    document.getElementById('___loader').style.display = 'none';
  }, 300);
};
