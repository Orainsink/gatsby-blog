import { useEffect, ReactElement } from 'react';
import { load as poemLoader } from 'jinrishici';
import { useLocalStorage } from 'react-use';
import styled, { css } from 'styled-components';

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

const mobileStyle = css`
  ${({ theme }) => theme.media.isMobile} {
    font-size: 18px;
  }
`;

const PoemContainer = styled.article`
  padding: 10px 16px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  height: 100px;
  font-weight: 700;
`;

const PoemContent = styled.div`
  font-size: 18px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  padding: 0 4px;
  text-align: center;
  position: absolute;
  color: var(--color-text);
`;

const PoemTitle = styled.div`
  font-size: 45px;
  top: 0;
  left: 10%;
  color: var(--color-text-fourth);
  position: absolute;
  ${mobileStyle}
`;

const Poet = styled.div`
  font-size: 45px;
  bottom: 0;
  right: 10%;
  color: var(--color-text-third);
  position: absolute;
  ${mobileStyle}
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
      <PoemContent>{poem?.content}</PoemContent>
      {poem?.origin.title ? (
        <PoemTitle>《{poem?.origin.title}》</PoemTitle>
      ) : null}
      <Poet>{poem?.origin.author}</Poet>
    </PoemContainer>
  );
};
