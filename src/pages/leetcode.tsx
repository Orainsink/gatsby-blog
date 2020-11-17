import React, { useMemo } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Divider, Table, Tag, Button } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../styles/archives.module.less';
import useResetKey from '../hooks/useResetKey';
import useWindowSize from '../hooks/useWindowSize';
import dayjs from 'dayjs';
import { ReactComponent as LeetcodeSvg } from '../assets/img/leetcode.svg';

interface Data {
  allFile: {
    group: { fieldValue: string }[];
    edges: ChildMdxItem[];
  };
}

const SnippetPage = ({ data }: PageProps<Data>) => {
  const { curDate } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);
  const options = useMemo(() => {
    return data.allFile.group.map((item) => ({
      text: item.fieldValue,
      value: item.fieldValue,
    }));
  }, [data]);

  useResetKey();
  const [width] = useWindowSize();

  const datas = useMemo(() => {
    return posts.map(({ node: { childMdx: mdx } }) => ({
      title: mdx.frontmatter?.title,
      description: mdx.frontmatter?.description ?? mdx.excerpt,
      tag: mdx.frontmatter?.tags[0],
      date: mdx.frontmatter?.date,
      index: mdx.frontmatter?.index,
      slug: mdx.fields?.slug,
      url: mdx.frontmatter?.url,
    }));
  }, [posts]);

  const columns: any = [
    {
      title: 'INDEX',
      dataIndex: 'index',
      width: 100,
      render: (text: string) => <div>{text ? `#${text}` : '-'}</div>,
      sorter: (a: any, b: any) => a.index - b.index,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      render: (text: string) => (
        <div style={{ fontWeight: 'bold' }}>{text}</div>
      ),
    },
    {
      title: 'TAG',
      dataIndex: 'tag',
      width: 80,
      render: (text: string) => <Tag>{text}</Tag>,
      onFilter: (value, record) => record.tag.indexOf(value) === 0,
      filters: options,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: '链接',
      dataIndex: 'url',
      width: 100,
      render: (text: string) =>
        text ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(text);
            }}
          >
            <LeetcodeSvg
              style={{
                width: '18px',
                height: '18px',
                verticalAlign: '-1px',
                marginRight: '4px',
              }}
            />
            查看题目
          </Button>
        ) : null,
    },
  ];
  const smallColumns: any = [
    {
      title: 'INDEX',
      dataIndex: 'index',
      render: (text: string) => <div>{text ? `# ${text}` : '-'}</div>,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      render: (text: string, row: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div>date：{row.date}</div>
          <div>
            <Tag>{row.tag}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'SOURCE',
      dataIndex: 'url',
      render: (text: string) => (
        <div>
          {text ? (
            <Button
              type="link"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(text);
              }}
            >
              <LeetcodeSvg style={{ width: '18px', height: '18px' }} />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <SEO title="Leetcode-归档" />
      <Divider orientation="center" className={styles.divider}>
        {curDate ? curDate : 'LEETCODE'}
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
      filter: { sourceInstanceName: { eq: "leetcode" } }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      group(field: childMdx___frontmatter___tags) {
        fieldValue
      }
      edges {
        node {
          childMdx {
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
              tags
              url
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
