import styled, { css } from 'styled-components';

type LineType = 'left' | 'right' | 'top' | 'bottom';

const wireframeBackgroundStyles = css`
  background-color: var(--color-text);
`;
const WireframeLine = styled.div<{ type: LineType }>`
  ${wireframeBackgroundStyles}
  position: absolute;
  transition: all 1s ease-in-out;

  ${({ type }) => {
    switch (type) {
      case 'left':
        return css`
          left: 0;
          width: 5px;
          height: 0;
        `;
      case 'right':
        return css`
          right: 0;
          width: 5px;
          height: 0;
        `;
      case 'top':
        return css`
          top: 0;
          width: 0;
          height: 5px;
        `;
      case 'bottom':
        return css`
          bottom: 0;
          width: 0;
          height: 5px;
        `;
    }
  }}
`;

export const WireframeBox = () => (
  <>
    <WireframeLine type="left" data-line="left"></WireframeLine>
    <WireframeLine type="right" data-line="right"></WireframeLine>
    <WireframeLine type="top" data-line="top"></WireframeLine>
    <WireframeLine type="bottom" data-line="bottom"></WireframeLine>
  </>
);
