import { ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

const SideContainer = styled.aside`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-md);
`;

interface Props {
  children: ReactNode;
}
/**侧边栏 */
export const SideBar = (props: Props): ReactElement => {
  const { children } = props;

  return (
    <div>
      <SideContainer>{children}</SideContainer>
    </div>
  );
};
