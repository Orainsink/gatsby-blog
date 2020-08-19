import * as React from 'react';
import SEO from '../components/seo';
import { Button } from 'antd';
import { Link } from 'gatsby';
import styles from '../styles/404.module.less';
import loadable from '@loadable/component';
const Loading = loadable(() => import('../components/Loading'));

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404: Not Found" />
      <Loading debounce={0}>
        <div className={styles.wrap}>
          <h1>404</h1>
          <h3>Not Found</h3>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <Link to="/">
            <Button>Back Home</Button>
          </Link>
        </div>
      </Loading>
    </>
  );
};

export default React.memo(NotFoundPage);
