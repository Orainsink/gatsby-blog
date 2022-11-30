import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { useScrollY } from '../../hooks';
import { isClient } from '../../utils/isClient';
import { Anchor } from '../Anchor';
import { BaseCol, Title } from './SideBlocks.styles';

interface Props {
  contents: any;
}

const fixedContentStyle = css`
  position: fixed !important;
  width: 300px;
  max-height: calc(100vh - 80px);
  top: 68px;
  padding-top: 20px;
  overflow-y: auto;
`;

const hideContentStyle = css`
  display: none;
`;

const ContentsContainer = styled(BaseCol)<{
  isFixed: boolean;
  isHide: boolean;
}>`
  height: unset;
  max-width: 300px;
  li {
    list-style-type: decimal;
    list-style-position: outside;
  }
  ${({ isFixed }) => isFixed && fixedContentStyle}
  ${({ isHide }) => isHide && hideContentStyle}
`;

const ContentsBody = styled.div`
  z-index: 1;
  position: relative;
`;

/** 侧边栏 目录块 */
export const Contents = (props: Props): ReactElement | null => {
  const { contents } = props;
  const scrollY = useScrollY();

  const isFixed = scrollY > 327;

  const isHide = isClient
    ? scrollY > document.body.scrollHeight - document.body.clientHeight - 400
    : false;

  if (!contents.items) return null;

  return (
    <ContentsContainer flex="0 0 300px" isFixed={isFixed} isHide={isHide}>
      <Title>Contents</Title>
      <ContentsBody>
        <Anchor
          getContainer={() => document.body as HTMLElement}
          contents={contents}
        />
      </ContentsBody>
    </ContentsContainer>
  );
};
