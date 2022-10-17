import { useEffect, ReactElement } from 'react';
import { load as poemLoader } from 'jinrishici';
import styled from 'styled-components';

import { useLocalStorage } from '../hooks';

interface PoemData {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
  };
}

interface PoemResponse {
  data: PoemData;
}

const PoemContainer = styled.article`
  padding: 10px 16px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  height: 100px;
  div {
    position: absolute;
    font-weight: 700;
  }
  & > div:nth-child(1) {
    font-size: 18px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 100%;
    padding: 0 4px;
    text-align: center;
  }
  & > div:nth-child(2) {
    font-size: 45px;
    top: 0;
    left: 10%;
    color: var(--text-color-fourth);
  }
  & > div:nth-child(3) {
    font-size: 45px;
    bottom: 0;
    right: 10%;
    color: var(--text-color-third);
  }
  ${({ theme }) => theme.media.isMobile} {
    & > div:not(:first-child) {
      font-size: 18px;
    }
  }
`;

export const Poem = (): ReactElement => {
  const [poem, setPoem] = useLocalStorage<null | PoemData>('poem', null);

  useEffect(() => {
    poemLoader((res: PoemResponse) => {
      setPoem(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PoemContainer>
      <div>{poem?.content}</div>
      {poem?.origin.title ? <div>《{poem?.origin.title}》</div> : null}
      <div>{poem?.origin.author}</div>
    </PoemContainer>
  );
};
