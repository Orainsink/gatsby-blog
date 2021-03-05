import React from 'react';

/**
 * anchor with target='_blank'
 */
const AnchorBlock = ({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a target="_blank" rel="noreferrer" {...rest}>
    {children}
  </a>
);

export default React.memo(AnchorBlock);
