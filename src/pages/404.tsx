import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { Button } from 'antd';
import { Link } from 'gatsby';
import Loading from '../components/Loading';
import styles from '../styles/404.module.less';

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: any;
}
const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
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
    </Layout>
  );
};

export default React.memo(NotFoundPage);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
