import { ReactElement } from 'react';
import { Button } from 'antd';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Seo } from '../components/Seo';
import { Loading } from '../components/Loading';

const NotFountContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  h1 {
    color: #fff;
    font-size: 45px;
  }
  h3 {
    color: rgba(255, 255, 255, 0.9);
  }
  p {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const NotFoundPage = (): ReactElement => (
  <>
    <Loading debounce={0}>
      <NotFountContainer>
        <h1>404</h1>
        <h3>Not Found</h3>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">
          <Button>Back Home</Button>
        </Link>
      </NotFountContainer>
    </Loading>
  </>
);

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;
