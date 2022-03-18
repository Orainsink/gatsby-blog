import { memo, DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

/**
 * anchor with target='_blank'
 */
const AnchorBlock = ({
  children,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a target="_blank" rel="noreferrer" {...rest}>
    {children}
  </a>
);

export default memo(AnchorBlock);
