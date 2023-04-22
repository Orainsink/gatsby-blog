import { FC } from 'react';
import { Typography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';

const { Link } = Typography;

/**
 * anchor with target='_blank'
 */
export const AnchorBlock: FC<LinkProps & React.RefAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => (
  <Link target="_blank" rel="noreferrer" className={className} {...rest}>
    {children}
  </Link>
);
