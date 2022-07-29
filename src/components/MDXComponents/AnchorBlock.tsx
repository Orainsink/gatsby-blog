import { DetailedHTMLProps, AnchorHTMLAttributes, ReactElement } from 'react';

/**
 * anchor with target='_blank'
 */
export const AnchorBlock = ({
  children,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>): ReactElement => (
  <a target="_blank" rel="noreferrer" {...rest}>
    {children}
  </a>
);
