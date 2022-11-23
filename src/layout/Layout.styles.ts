import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  transition: top 0.5s ease-out;
  left: 0;
  right: 0;
  z-index: 1;
  padding-bottom: 320px;
`;

export const Main = styled.main`
  margin: 8em auto 0 auto;
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
  background: var(--color-bg-container);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 0.8em !important;
  min-height: 25.6em;
  z-index: 1;
  width: 100%;
`;
