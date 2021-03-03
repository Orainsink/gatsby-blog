import React, { useCallback, useMemo } from 'react';
import { Card, Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { ReactComponent as MarkSvg } from '../assets/img/mark.svg';
import styles from '../styles/Cards.module.less';
import FEImg from '../assets/img/javascript.png';
import leetcodeImg from '../assets/img/leetcode.png';
import dialogImg from '../assets/img/随笔.png';
import snippetImg from '../assets/img/snippet.png';
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
        img: leetcodeImg,
      },
      {
        category: 'snippet',
        name: 'snippet',
        path: '/snippet',
        count: getCount('snippet'),
        img: '../assets/img/snippet.png',
      },
      {
        category: 'essay',
        name: '随笔',
        path: '/essay',
        count: getCount('essay'),
        img: dialogImg,
      },
      {
        category: 'tech',
        name: '技术',
        path: '/archives',
        count: getCount('tech'),
        img: FEImg,
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
              cover={
                <StaticImage
                  src={item.img}
                  alt=""
                  style={{
                    width: '100%',
                    paddingBottom: '56.25%',
                    height: 0,
                    transition: 'all 500ms ease',
                  }}
                  className={styles.imgWrap}
                />
              }
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
