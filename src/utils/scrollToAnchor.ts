export const scrollToAnchor = (hash: string) => {
  const id = decodeURI(hash.split('#')[1]);
  const element = document.getElementById(id);

  if (element) {
    document.body.scrollTo({
      top: element.offsetTop,
      left: 0,
    });
  } else {
    document.body.scrollTo(0, 0);
  }
};
