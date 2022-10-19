import { useMemo, ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Tag } from 'antd';
import dayjs from 'dayjs';

import { useResetKey, useMedia, useIsDark } from '../hooks';
import { Layout } from '../layout/BlogLayout';
import { SeoHelmet } from '../components/SeoHelmet';
import { generatePath } from '../utils/generatePath';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { GetSnippetPageDataQuery } from '../../graphql-types';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';
import { PageDivider, ReloadIcon, WrappedTable } from '../layout/Pages.styles';

type Data = DeepRequiredAndNonNullable<GetSnippetPageDataQuery>;

const SnippetPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);
  const isDark = useIsDark();

  useResetKey();
  const isMobile = useMedia('isMobile');

  const datas = useMemo(() => {
    return posts.map(({ node: { childMdx: mdx } }) => {
      const frontmatter = mdx.frontmatter!;
      const fields = mdx.fields!;
      return {
        title: frontmatter.title,
        description: frontmatter.description ?? mdx.excerpt,
        tag: frontmatter.tags[0],
        categories: frontmatter.categories,
        date: frontmatter.date,
        slug: fields.slug,
        id: mdx.id,
      };
    });
  }, [posts]);

  const columns: any = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      render: (text: string) => (
        <div style={{ fontWeight: 'bold' }}>{text}</div>
      ),
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: 350,
    },
    {
      title: 'TAG',
      dataIndex: 'tag',
      width: 80,
      render: (text: string) => (
        <Tag color={isDark ? 'var(--tag-color)' : 'blue'}>{text}</Tag>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
  ];
  const smallColumns: any = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      width: 250,
      render: (text: string, row: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div>{row.description}</div>
          <div>
            <Tag color={isDark ? 'var(--tag-color)' : 'blue'}>{row.tag}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
  ];

  return (
    <Layout>
      <SeoHelmet title="Snippet-归档" />
      <PageDivider orientation="center">
        {curDate ? curDate : 'SNIPPET'}
        {curDate ? <ReloadIcon onClick={resetFilter} /> : null}
      </PageDivider>
      <WrappedTable
        columns={isMobile ? smallColumns : columns}
        dataSource={datas}
        rowKey="slug"
        showSorterTooltip={false}
        size={isMobile ? 'middle' : 'large'}
        pagination={{ pageSize: 16 }}
        onRow={(row) => ({
          onClick: () => navigate(generatePath(row.categories!, row.slug!)),
        })}
      />
    </Layout>
  );
};

export default SnippetPage;

export const pageQuery = graphql`
  query getSnippetPageData {
    allFile(
      filter: { sourceInstanceName: { eq: "snippet" } }
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
