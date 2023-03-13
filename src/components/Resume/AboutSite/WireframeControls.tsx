import styled, { css } from 'styled-components';

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;

  width: 100%;

  text-align: center;
`;

const Node = styled.div`
  opacity: 0;
  background-color: var(--color-text);
  position: relative;
  top: 30px;

  display: inline-block;

  width: 7px;
  height: 7px;
  margin: 0 5px;

  border-radius: 50%;
  transition: top 0.5s ease-in-out;

  ${({ theme }) =>
    theme.media.isMobile &&
    css`
      top: 30px;
      opacity: 0;
    `}
`;

export const WireframeControls = () => (
  <ControlsContainer>
    <Node data-node />
    <Node data-node />
    <Node data-node />
    <Node data-node />
  </ControlsContainer>
);
