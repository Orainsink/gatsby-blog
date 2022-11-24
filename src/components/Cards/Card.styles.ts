import styled from 'styled-components';
import { Card } from 'antd';

import { ReactComponent as MarkSvg } from '../../assets/img/mark.svg';

export const CardSection = styled.section`
  margin-bottom: 1em;
`;

export const StyledTitle = styled.div`
  font-size: 1rem;
  width: 100%;
  text-align: center;
  margin: 1em auto;
`;

export const StyledMarkSvg = styled(MarkSvg)`
  color: #dcdcdc;
  fill: #dcdcdc;
  margin-right: 1em;
`;

export const StyledCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 16px 16px;
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
    transition: all 500ms ease;

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
