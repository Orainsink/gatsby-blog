import styled from 'styled-components';
import { Card } from 'antd';

import { ReactComponent as MarkSvg } from '../../assets/img/mark.svg';

export const CardSection = styled.section`
  margin-bottom: var(--space-md);
`;

export const StyledTitle = styled.div`
  font-size: var(--font-size-md);
  width: 100%;
  text-align: center;
  margin: var(--space-md) auto;
`;

export const StyledMarkSvg = styled(MarkSvg)`
  color: #dcdcdc;
  fill: #dcdcdc;
  margin-right: var(--space-md);
`;

export const StyledCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: var(--space-md) var(--space-md);
  grid-template-areas: '. . . .';

  ${({ theme }) => theme.media.isMobile} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      '. .'
      '. .';
  }
`;

export const StyledCard = styled(Card)`
  margin: 10px 0;
  overflow: hidden;
  background: var(--color-bg-component);

  .ant-card-cover {
    overflow: hidden;
  }

  .card-static-image {
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    transition: all 0.3s ease;

    ${({ theme }) => theme.media.isMobile} {
      height: 100px !important;
    }
  }

  &:hover {
    .card-static-image {
      transform: scale(1.2);
    }
  }
`;
