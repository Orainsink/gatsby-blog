import React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
}
/**
 * anchor with target='_blank'
 */
const AnchorBlock = ({ href, children, ...rest }: Props) => (
  <a href={href} target="_blank" rel="noreferrer" {...rest}>
    {children}
  </a>
);

export default React.memo(AnchorBlock);
