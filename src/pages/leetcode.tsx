import { useMemo, ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Button, Divider, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import SEO from '../components/seo';
import Layout from '../layout/BlogLayout';
import * as styles from './archives/index.module.less';
import generatePath from '../utils/generatePath';
import { ColumnsType } from 'antd/lib/table';
import { iRootState } from '../redux/store';
import { useResetKey, useMedia, useIsDark } from '../hooks';
import { ReactComponent as LeetcodeSvg } from '../assets/img/leetcode.svg';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { GetLeetcodePageDataQuery } from '../../graphql-types';

type Data = DeepRequiredAndNonNullable<GetLeetcodePageDataQuery>;
interface ColumnItemType {
  title: string;
  description: string;
  tag: string;
  date: any;
  index: number;
  slug: string;
  url: string;
  categories: string;
  id: string;
}
const SnippetPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
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
      const frontmatter = mdx.frontmatter!;
      return {
        title: frontmatter.title,
        description: frontmatter.description ?? mdx.excerpt,
        // @ts-ignore
        tag: frontmatter.tags[0],
        date: frontmatter.date,
        index: frontmatter.index,
        slug: mdx.fields?.slug,
        url: frontmatter.url,
        categories: frontmatter.categories,
        id: mdx.id,
      };
    });
  }, [posts]);

  const columns: ColumnsType<ColumnItemType> = [
    {
      title: 'INDEX',
      dataIndex: 'index',
      align: 'center',
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
      render: (text: string) => (
        <Tag color={isDark ? 'var(--tag-color)' : 'blue'}>{text}</Tag>
      ),
      onFilter: (value, record) => record.tag.indexOf(value + '') === 0,
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
          <Button ghost={isDark ? true : false} href={text}>
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
  const smallColumns: ColumnsType<ColumnItemType> = [
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
            <Tag color={isDark ? 'var(--tag-color)' : 'blue'}>{row.tag}</Tag>
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
              ghost={isDark ? true : false}
              href={text}
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
      <Table<ColumnItemType>
        rowClassName={styles.clsRow}
        columns={isMobile ? smallColumns : columns}
        dataSource={datas as any}
        rowKey="slug"
        showSorterTooltip={false}
        size={columns ? 'middle' : 'large'}
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
  query getLeetcodePageData {
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
            id
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
              categories
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
