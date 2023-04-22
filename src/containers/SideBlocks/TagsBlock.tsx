import { ReactElement } from 'react';
import styled from 'styled-components';

import { useMedia } from '../../hooks';
import { WordCloud } from '../../components/WordCloud';
import { BaseCol, Title } from './SideBlocks.styles';

const WordCloudContainer = styled(BaseCol)`
  overflow: hidden;
`;

/* wordCloud */
export const TagsBlock = (): ReactElement => {
  const isDesktop = useMedia('isDesktop');

  return (
    <WordCloudContainer flex={isDesktop ? '0 0 300px' : '1 1 300px'}>
      <Title>TAGS</Title>
      <WordCloud jump height={200} />
    </WordCloudContainer>
  );
};
