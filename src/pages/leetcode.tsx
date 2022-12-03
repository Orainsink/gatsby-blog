import { useMemo, ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Button, Tag } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

import { Seo } from '../components/Seo';
import { Layout } from '../layout/BlogLayout';
import { generatePath } from '../utils/generatePath';
import { useResetKey, useMedia, useIsDark } from '../hooks';
import { ReactComponent as LeetcodeSvg } from '../assets/img/leetcode.svg';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';
import { PageDivider, ReloadIcon, WrappedTable } from '../layout/Pages.styles';

type Data = DeepRequiredAndNonNullable<Queries.getLeetcodePageDataQuery>;

const LeetcodePage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);
  const options = useMemo(() => {
    return data.allFile.group.map((item) => ({
      text: item.fieldValue,
      value: item.fieldValue,
    }));
  }, [data]);

  const isDark = useIsDark();
  useResetKey();
  const isMobile = useMedia('isMobile');
  const datas = useMemo(() => {
    return posts.map(({ node: { childMdx: mdx } }) => {
      const frontmatter = mdx.frontmatter;
      return {
        title: frontmatter.title,
        description: frontmatter.description ?? mdx.excerpt,
        // @ts-ignore
        tag: frontmatter.tags[0],
        date: frontmatter.date,
        index: frontmatter.index,
        slug: mdx.fields.slug,
        categories: frontmatter.categories,
        id: mdx.id,
      };
    });
  }, [posts]);

  const columns: ColumnsType<typeof datas[number]> = [
    {
      title: 'INDEX',
      dataIndex: 'index',
      align: 'center',
      width: 100,
      render: (text: string) => <div>{text ? `#${text}` : '-'}</div>,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      render: (text: string) => (
        <div style={{ fontWeight: 'var(--font-weight-lg)' }}>{text}</div>
      ),
    },
    {
      title: 'TAG',
      dataIndex: 'tag',
      width: 80,
      render: (text: string) => (
        <Tag color={isDark ? 'warning' : 'processing'}>{text}</Tag>
      ),
      onFilter: (value, record) => record.tag.indexOf(value + '') === 0,
      filters: options,
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
      title: 'INDEX',
      dataIndex: 'index',
      render: (text: string) => <div>{text ? `# ${text}` : '-'}</div>,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      render: (text: string, row) => (
        <div>
          <div style={{ fontWeight: 'var(--font-weight-lg)' }}>{text}</div>
          <div>date：{row.date}</div>
          <div>
            <Tag color={isDark ? 'warning' : 'processing'}>{row.tag}</Tag>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <PageDivider orientation="center">
        {curDate ? curDate : 'LEETCODE'}
        {curDate ? <ReloadIcon onClick={resetFilter} /> : null}
      </PageDivider>
      <WrappedTable
        columns={isMobile ? smallColumns : columns}
        dataSource={datas as any}
        rowKey="slug"
        showSorterTooltip={false}
        size={columns ? 'middle' : 'large'}
        pagination={{ pageSize: 16 }}
        onRow={(row) => ({
          onClick: () => navigate(generatePath(row.categories, row.title)),
        })}
      />
    </Layout>
  );
};

export default LeetcodePage;

export const Head = () => <Seo title="Leetcode-归档" />;

export const pageQuery = graphql`
  query getLeetcodePageData {
    allFile(
      filter: { sourceInstanceName: { eq: "leetcode" } }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      group(field: { childMdx: { frontmatter: { tags: SELECT } } }) {
        fieldValue
      }
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
              index
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
