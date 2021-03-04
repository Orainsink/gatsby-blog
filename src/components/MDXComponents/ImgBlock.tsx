import React from 'react';

/**
 * img with noReferer
 */
const ImgBlock = ({
  alt,
  ...rest
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => <img {...rest} alt={alt ?? ''} referrerPolicy="no-referrer" />;

export default React.memo(ImgBlock);
