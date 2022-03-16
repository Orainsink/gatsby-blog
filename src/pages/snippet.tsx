import React, { useMemo } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Divider, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';

import * as styles from './archives/index.module.less';
import { useResetKey, useMedia, useIsDark } from '../hooks';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import generatePath from '../utils/generatePath';
import { iRootState } from '../redux/store';

interface Data {
  allFile: {
    edges: ChildMdxItem[];
  };
}

const SnippetPage = ({ data }: PageProps<Data>) => {
  const { curDate } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);
  const isDark = useIsDark()

  useResetKey();
  const is768 = useMedia('(max-width: 768px)');

  const datas = useMemo(() => {
    return posts.map(({ node: { childMdx: mdx } }) => ({
      title: mdx.frontmatter?.title,
      description: mdx.frontmatter?.description ?? mdx.excerpt,
      tag: mdx.frontmatter?.tags[0],
      categories: mdx.frontmatter.categories,
      date: mdx.frontmatter?.date,
      slug: mdx.fields?.slug,
      id: mdx.id,
    }));
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
        <Tag color={isDark? 'var(--tag-color)' : 'blue'}>{text}</Tag>
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
            <Tag color={isDark ? 'var(--tag-color)' : 'blue'}>
              {row.tag}
            </Tag>
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
      <SEO title="Snippet-归档" />
      <Divider orientation="center" className={styles.divider}>
        {curDate ? curDate : 'SNIPPET'}
        {curDate ? (
          <ReloadOutlined
            className={styles.reloadIcon}
            onClick={() => dispatch({ type: 'RESET_SEARCH' })}
          />
        ) : null}
      </Divider>
      <Table
        rowClassName={styles.clsRow}
        columns={is768 ? smallColumns : columns}
        dataSource={datas}
        rowKey="slug"
        showSorterTooltip={false}
        size={is768 ? 'middle' : 'large'}
        pagination={{ pageSize: 16 }}
        onRow={(row) => ({
          onClick: () => navigate(generatePath(row.categories, row.slug)),
        })}
      ></Table>
    </Layout>
  );
};

export default SnippetPage;

export const pageQuery = graphql`
  {
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
