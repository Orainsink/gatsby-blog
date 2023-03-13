import styled, { css } from 'styled-components';

const TextContainer = styled.div<{ $type: TextType }>`
  overflow: hidden;

  ${({ $type }) => {
    switch ($type) {
      case 'left':
        return css`
          float: left;
          width: 40%;
        `;
      case 'right':
        return css`
          float: right;
          width: 40%;
        `;
      case 'default':
        return css`
          width: 0;
          height: 5px;
          margin-bottom: 20px;
        `;
    }
  }}
`;

const TextLine = styled.div<{ $incomplete?: boolean }>`
  width: 0;
  height: 5px;
  margin-bottom: 20px;
  background-color: var(--color-text);
  ${({ $incomplete }) =>
    !$incomplete &&
    css`
      width: 0;
    `}
`;

type TextType = 'left' | 'right' | 'default';
export const WireframeText = ({ type = 'default' }: { type?: TextType }) => (
  <TextContainer $type={type}>
    <TextLine data-text />
    <TextLine data-text />
    <TextLine $incomplete data-text="incomplete" />
  </TextContainer>
);
