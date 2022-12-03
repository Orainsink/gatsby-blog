import { ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Tag } from 'antd';
import dayjs from 'dayjs';

import { useResetKey, useMedia, useIsDark } from '../hooks';
import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { generatePath } from '../utils/generatePath';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';
import { PageDivider, ReloadIcon, WrappedTable } from '../layout/Pages.styles';
import { ColumnsType } from 'antd/es/table';

type Data = DeepRequiredAndNonNullable<Queries.getSnippetPageDataQuery>;
const SnippetPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  useResetKey();
  const isMobile = useMedia('isMobile');
  const isDark = useIsDark();

  const datas = posts.map(({ node: { childMdx: mdx } }) => {
    const frontmatter = mdx.frontmatter;
    const fields = mdx.fields;
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

  const columns: ColumnsType<typeof datas[number]> = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      render: (text: string) => (
        <div style={{ fontWeight: 'var(--font-weight-lg)' }}>{text}</div>
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
        <Tag color={isDark ? 'warning' : 'processing'}>{text}</Tag>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
  ];
  const smallColumns: ColumnsType<typeof datas[number]> = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      width: 250,
      render: (text, row) => (
        <div>
          <div style={{ fontWeight: 'var(--font-weight-lg)' }}>{text}</div>
          <div>{row.description}</div>
          <div>
            <Tag color={isDark ? 'warning' : 'processing'}>{row.tag}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
  ];

  return (
    <Layout>
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
          onClick: () => navigate(generatePath(row.categories, row.title)),
        })}
      />
    </Layout>
  );
};

export default SnippetPage;

export const Head = () => <Seo title="Snippet-归档" />;

export const pageQuery = graphql`
  query getSnippetPageData {
    allFile(
      filter: { sourceInstanceName: { eq: "snippet" } }
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
