import { useEffect, ReactElement, useState } from 'react';
import { load as poemLoader } from 'jinrishici';
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
    font-size: var(--font-size-lg);
  }
`;

const PoemContainer = styled.article`
  padding: 10px var(--space-md);
  position: relative;
  overflow: hidden;
  opacity: 1;
  height: 100px;
  font-weight: var(--font-weight-xl);
  border-bottom: 1px solid var(--color-border);
`;

const PoemContent = styled.div`
  font-size: var(--font-size-lg);
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
  const [poem, setPoem] = useState<null | PoemData>(null);

  useEffect(() => {
    const storedPoem = localStorage.getItem('poem');
    setPoem(storedPoem ? JSON.parse(storedPoem) : null);
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
