import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';

interface Props {
  data: any;
  location: any;
}
const AboutPage = ({ data, location }: Props) => {
  return (
    <Layout location={location} title={'About me'}>
      <SEO title="404: Not Found" />
      <h1>这里是我</h1>
      <p>这里是我的介绍</p>
    </Layout>
  );
};

export default AboutPage;
