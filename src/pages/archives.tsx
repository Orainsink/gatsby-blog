import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';

import { WordCloud } from '../components/WordCloud';
import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { PostList } from '../components/PostList';
import { CalendarBlock } from '../components/SideBlocks/Calendar';
import { GetArchivesPageDataQuery, FileEdge } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';
import { PageDivider, ReloadIcon } from '../layout/Pages.styles';

type Data = DeepRequiredAndNonNullable<GetArchivesPageDataQuery>;

const ArchivesPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curTag, curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter(
    (item) => item.node.childMdx
  ) as FileEdge[];

  return (
    <Layout sideBlocks={<CalendarBlock posts={posts} />}>
      <WordCloud />
      <PageDivider orientation="center">
        {curTag ? '#' + curTag : curDate ? curDate : 'ARCHIVES'}
        {curTag || curDate ? <ReloadIcon onClick={resetFilter} /> : null}
      </PageDivider>
      <PostList posts={posts} hideMore />
    </Layout>
  );
};

export default ArchivesPage;

export const Head = () => <Seo title="技术-归档" />;

export const pageQuery = graphql`
  query getArchivesPageData {
    allFile(
      filter: { sourceInstanceName: { eq: "tech" } }
      sort: { childMdx: { frontmatter: { date: DESC } } }
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
