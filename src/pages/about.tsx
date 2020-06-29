import * as React from 'react';
import { graphql } from 'gatsby';
import MyPlayer from '../components/MyPlayer';

import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';

interface Props {
  data: any;
  location: any;
}
const AboutPage = ({ data, location }: Props) => {
  return (
    <Layout location={location} title={'About me'}>
      <SEO title="About" />
      <MyPlayer />
    </Layout>
  );
};

export default AboutPage;
