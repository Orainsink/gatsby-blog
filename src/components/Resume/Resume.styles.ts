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
