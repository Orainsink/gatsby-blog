import React from 'react';

interface Props {
  alt: string;
  src: string;
}
/**
 * img with noReferer
 */
const ImgBlock = (props: Props) => {
  // eslint-disable-next-line
  return <img {...props} referrerPolicy="no-referrer" />;
};

export default React.memo(ImgBlock);
