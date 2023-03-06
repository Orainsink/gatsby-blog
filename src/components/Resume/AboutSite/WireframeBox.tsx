import styled, { css } from 'styled-components';

type LineType = 'left' | 'right' | 'top' | 'bottom';

const WireframeLine = styled.div<{ $type: LineType }>`
  background-color: var(--color-text);
  position: absolute;

  ${({ $type }) => {
    switch ($type) {
      case 'left':
        return css`
          transition: height 1s ease-in-out;
          left: 0;
          width: 5px;
          height: 0;
        `;
      case 'right':
        return css`
          transition: height 1s ease-in-out;
          right: 0;
          width: 5px;
          height: 0;
        `;
      case 'top':
        return css`
          transition: width 1s ease-in-out;
          top: 0;
          width: 0;
          height: 5px;
        `;
      case 'bottom':
        return css`
          transition: width 1s ease-in-out;
          bottom: 0;
          width: 0;
          height: 5px;
        `;
    }
  }}
`;

export const WireframeBox = () => (
  <>
    <WireframeLine $type="left" data-line="left"></WireframeLine>
    <WireframeLine $type="right" data-line="right"></WireframeLine>
    <WireframeLine $type="top" data-line="top"></WireframeLine>
    <WireframeLine $type="bottom" data-line="bottom"></WireframeLine>
  </>
);
