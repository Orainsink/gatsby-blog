import { ReactElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const headerCommonStyles = css`
  text-rendering: optimizeLegibility;
  color: var(--color-mdx-header);

  a {
    font-size: inherit !important;
    font-weight: inherit !important;
  }
`;

const StyledH3 = styled.h3`
  ${headerCommonStyles}
`;
const StyledH4 = styled.h4`
  ${headerCommonStyles}
`;
const StyledH2 = styled.h2`
  ${headerCommonStyles}
  border-radius: var(--border-radius-sm);
  margin: var(--space-lg) 0;
  border-left: var(--space-xxs) solid var(--color-border);
  padding-left: var(--space-md);
`;

export interface HxBlockProps {
  level: 2 | 3 | 4;
  children: ReactNode;
  id: string;
}
export const HxBlock = ({
  level,
  id,
  children,
  ...rest
}: HxBlockProps): ReactElement | null => {
  if (level === 2)
    return (
      <StyledH2 {...rest} id={id}>
        {children}
      </StyledH2>
    );
  if (level === 3)
    return (
      <StyledH3 {...rest} id={id}>
        {children}
      </StyledH3>
    );
  if (level === 4)
    return (
      <StyledH4 {...rest} id={id}>
        {children}
      </StyledH4>
    );
  return null;
};
