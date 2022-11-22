import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  padding-bottom: 320px;
  padding-top: 8em;
`;

export const Main = styled.main`
  margin: 0 auto 0 auto;
  max-width: 1200px;
  padding: 0.4em;

  ${({ theme }) => theme.media.isMobile} {
    padding: 0;
  }
`;

export const containerStyles = css`
  display: grid;
  gap: 20px 20px;
  grid-template-areas: '.';
  grid-template-columns: minmax(100px, 1024px);
  grid-template-rows: 1fr;
  min-height: calc(100vh - 448px);

  ${({ theme }) => theme.media.isDesktop} {
    grid-template-columns: minmax(100px, 870px) 300px;
    grid-template-areas: '. .';
  }
`;

export const MainWrap = styled.div`
  background: var(--main-background);
  border-radius: var(--border-radius-base);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  padding: 0.8em !important;
  min-height: 25.6em;
  z-index: 1;
  width: 100%;
`;
