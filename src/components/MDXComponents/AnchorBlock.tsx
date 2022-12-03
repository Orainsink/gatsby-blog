import { FC } from 'react';
import { Typography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';
import { REMARK_LINK_CLASS } from '../../assets/constants/common';

const { Link } = Typography;

/**
 * anchor with target='_blank'
 */
export const AnchorBlock: FC<LinkProps & React.RefAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => (
  <Link
    target={className?.includes(REMARK_LINK_CLASS) ? '_self' : '_blank'}
    rel="noreferrer"
    className={className}
    {...rest}
  >
    {children}
  </Link>
);
