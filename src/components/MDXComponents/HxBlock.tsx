import { ReactElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const headerCommonStyles = css`
  margin: 0.67em 0;
  padding: 0;
  font-weight: var(--font-weight-xl);
  text-rendering: optimizeLegibility;
  line-height: 1.1;
  color: var(--color-mdx-header);
`;

const StyledH3 = styled.h3`
  ${headerCommonStyles}
`;
const StyledH4 = styled.h4`
  ${headerCommonStyles}
`;
const StyledH2 = styled.h2`
  ${headerCommonStyles}

  &::before {
    padding-left: var(--space-sm);
    border-left: var(--space-xxs) solid var(--color-border);
    content: '';
    border-radius: var(--border-radius-sm);
  }
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
