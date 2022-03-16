import React from 'react';
import { Card, Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { ReactComponent as MarkSvg } from '../../assets/img/mark.svg';
import * as styles from './index.module.less';

const { Meta } = Card;

interface GroupItem {
  totalCount: number;
  fieldValue: string;
}
interface Data {
  allFile: {
    totalCount: number;
    group: GroupItem[];
  };
}

/**
 * get category count
 * @param category
 * @param group
 * @returns
 */
const getCount = (category: string, group: GroupItem[]) => {
  return (
    group.find((item) => item.fieldValue === category)?.totalCount || 0
  );
};
/**
 * get category info
 * @param group
 * @returns
 */
const getColumn = (group: GroupItem[]) => {
  return [
    {
      category: 'leetcode',
      name: 'leetcode',
      path: '/leetcode',
      count: getCount('leetcode', group),
      img: (
        <StaticImage
          src="../../../content/assets/leetcode.png"
          alt="leetcode"
          className={styles.imgWrap}
          placeholder="blurred"
        />
      ),
    },
    {
      category: 'snippet',
      name: 'snippet',
      path: '/snippet',
      count: getCount('snippet', group),
      img: (
        <StaticImage
          src="../../../content/assets/snippet.png"
          alt="snippet"
          className={styles.imgWrap}
          placeholder="blurred"
        />
      ),
    },
    {
      category: 'essay',
      name: '随笔',
      path: '/essay',
      count: getCount('essay', group),
      img: (
        <StaticImage
          src="../../../content/assets/随笔.png"
          alt="essay"
          className={styles.imgWrap}
          placeholder="blurred"
        />
      ),
    },
    {
      category: 'tech',
      name: '技术',
      path: '/archives',
      count: getCount('tech', group),
      img: (
        <StaticImage
          src="../../../content/assets/javascript.png"
          alt="tech"
          className={styles.imgWrap}
          placeholder="blurred"
        />
      ),
    },
  ];
};

const CategoryComponent = () => {
  const data: Data = useStaticQuery(graphql`
    query TagsQuery {
      allFile {
        totalCount
        group(field: childMdx___frontmatter___categories) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  const { group } = data.allFile;

  return (
    <section className={styles.wrap}>
      <div className={styles.title}>
        <MarkSvg className={styles.mark} />
        欢迎光临！博主 莫沉 是个前端菜狗，学习 TDD 和 Go 中。
      </div>
      <Row gutter={16} justify="space-around">
        {getColumn(group).map((item) => (
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            flex="1 0 200px"
            key={item.name}
          >
            <Card
              hoverable
              className={styles.cardWrap}
              onClick={() => navigate(item.path)}
              cover={item.img}
            >
              <Meta title={item.name} description={`${item.count}篇文章`} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default React.memo(CategoryComponent);
