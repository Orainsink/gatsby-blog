import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';
import { Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import WordCloud from '../../components/WordCloud';
import Layout from '../../layout/BlogLayout';
import SEO from '../../components/seo';
import * as styles from './index.module.less';
import PostList from '../../components/PostList';
import Calendar from '../../components/SideBlocks/Calendar';
import { iRootState } from '../../redux/store';
import { GetArchivesPageDataQuery, FileEdge } from '../../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';

type Data = DeepRequiredAndNonNullable<GetArchivesPageDataQuery>;

const ArchivesPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curTag, curDate } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter(
    (item) => item.node.childMdx
  ) as FileEdge[];

  return (
    <Layout sideBlocks={<Calendar posts={posts} />}>
      <SEO title="技术-归档" />
      <WordCloud />
      <Divider orientation="center" className={styles.divider}>
        {curTag ? '#' + curTag : curDate ? curDate : 'ARCHIVES'}
        {curTag || curDate ? (
          <ReloadOutlined
            className={styles.reloadIcon}
            onClick={() => dispatch({ type: 'RESET_SEARCH' })}
          />
        ) : null}
      </Divider>
      <PostList posts={posts} hideMore />
    </Layout>
  );
};

export default ArchivesPage;

export const pageQuery = graphql`
  query getArchivesPageData {
    allFile(
      filter: { sourceInstanceName: { eq: "tech" } }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          childMdx {
            id
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
              categories
              tags
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  }
`;
