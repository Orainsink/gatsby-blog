import { memo, ReactElement } from 'react';
import { Button } from 'antd';
import { Link } from 'gatsby';

import SEO from '../../components/seo';
import Loading from '../../components/Loading';
import * as styles from './index.module.less';

const NotFoundPage = (): ReactElement => (
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

export default memo(NotFoundPage);
