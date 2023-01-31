import { ReactElement } from 'react';
import { PageProps } from 'gatsby';

import { Seo } from '../components/Seo';
import { Layout } from '../layout/BlogLayout';

const CollectionPage = ({ data }: PageProps<any>): ReactElement => {
  return <Layout>123</Layout>;
};

export default CollectionPage;

export const Head = () => <Seo title="Collection-归档" />;
