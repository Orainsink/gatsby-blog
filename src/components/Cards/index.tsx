import React, { useCallback, useMemo } from 'react';
import { Card, Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { ReactComponent as MarkSvg } from '../../assets/img/mark.svg';
import * as styles from './index.module.less';

const { Meta } = Card;

interface Data {
  allFile: {
    totalCount: number;
    group: {
      totalCount: number;
      fieldValue: string;
    }[];
  };
}

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

  const getCount = useCallback(
    (category: string) => {
      return (
        group.filter((item) => item.fieldValue === category)[0]?.totalCount || 0
      );
    },
    [group]
  );

  const cateColumn = useMemo(() => {
    return [
      {
        category: 'leetcode',
        name: 'leetcode',
        path: '/leetcode',
        count: getCount('leetcode'),
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
        count: getCount('snippet'),
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
        count: getCount('essay'),
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
        count: getCount('tech'),
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
  }, [getCount]);

  return (
    <section className={styles.wrap}>
      <div className={styles.title}>
        <MarkSvg className={styles.mark} />
        欢迎光临！博主 莫沉 是个前端菜狗，龟速学习中。
      </div>
      <Row gutter={16} justify="space-around">
        {cateColumn.map((item) => (
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
