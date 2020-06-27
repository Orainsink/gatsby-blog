import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';

interface Props {
  data: any;
  location: any;
}
const ArchivesPage = ({ data, location }: Props) => {
  return (
    <Layout location={location} title={'About me'}>
      <SEO title="404: Not Found" />
      <h1>这里是我</h1>
      <p>这里是目录</p>
    </Layout>
  );
};

export default ArchivesPage;
