export const closePageLoader = () => {
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
