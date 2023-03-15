import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;

  *[data-el] {
    opacity: 0;
    transform: translateY(-100px);
    position: relative;
  }

  &:last-child {
    padding-bottom: 200px;
  }
`;

export const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  pointer-events: none;

  canvas {
    width: 100%;
    height: 100%;
  }
`;
