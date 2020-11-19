/** close loading */
export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById('___loader').style.opacity = 0;
  }, 600);
  setTimeout(function () {
    document.getElementById('___loader').style.display = 'none';
  }, 1000);
};
