import React, { useMemo } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Divider, Table, Tag } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../styles/archives.module.less';
import useResetKey from '../hooks/useResetKey';
import useWindowSize from '../hooks/useWindowSize';
import dayjs from 'dayjs';

interface Data {
  allFile: {
    edges: ChildMdxItem[];
  };
}

const SnippetPage = ({ data, location }: PageProps<Data>) => {
  const { curDate } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  useResetKey();
  const [width] = useWindowSize();

  const datas = useMemo(() => {
    return posts.map(({ node: { childMdx: mdx } }) => ({
      title: mdx.frontmatter?.title,
      description: mdx.frontmatter?.description ?? mdx.excerpt,
      //@ts-ignore
      tag: mdx.frontmatter?.tags[0],
      date: mdx.frontmatter?.date,
      slug: mdx.fields?.slug,
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
      render: (text: string) => <Tag>{text}</Tag>,
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
            <Tag>{row.tag}</Tag>
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
    <Layout location={location}>
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
        columns={width > 768 ? columns : smallColumns}
        dataSource={datas}
        rowKey="slug"
        showSorterTooltip={false}
        size={width > 768 ? 'large' : 'middle'}
        pagination={{ pageSize: 16 }}
        onRow={(row) => ({
          onClick: () => navigate(row.slug ?? '/'),
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
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
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
