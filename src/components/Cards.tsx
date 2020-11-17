import React, { useCallback } from 'react';
import { Row, Col, Card } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Image from 'gatsby-image';
import { ReactComponent as MarkSvg } from '../assets/img/mark.svg';
import styles from '../styles/Cards.module.less';
const { Meta } = Card;

interface Data {
  allFile: {
    totalCount: number;
    group: {
      totalCount: number;
      fieldValue: string;
    }[];
  };
  FEImg: any;
  leetcodeImg: any;
  dialogImg: any;
  snippetImg: any;
}

const CategoryComponent = () => {
  const cates = [
    { category: 'leetcode', name: 'leetcode', path: '/leetcode' },
    { category: 'snippet', name: 'snippet', path: '/snippet' },
    { category: 'essay', name: '随笔', path: '/essay' },
    { category: 'tech', name: '技术', path: '/archives' },
  ];

  const data: Data = useStaticQuery(graphql`
    query TagsQuery {
      allFile {
        totalCount
        group(field: childMdx___frontmatter___categories) {
          totalCount
          fieldValue
        }
      }
      FEImg: file(absolutePath: { regex: "/javascript.png/" }) {
        childImageSharp {
          fixed(width: 320, height: 180) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      leetcodeImg: file(absolutePath: { regex: "/leetcode.png/" }) {
        childImageSharp {
          fixed(width: 320, height: 180) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dialogImg: file(absolutePath: { regex: "/随笔.png/" }) {
        childImageSharp {
          fixed(width: 320, height: 180) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      snippetImg: file(absolutePath: { regex: "/snippet.png/" }) {
        childImageSharp {
          fixed(width: 320, height: 180) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { group, totalCount } = data.allFile;
  const { FEImg, leetcodeImg, dialogImg, snippetImg } = data;

  const cateFilter = useCallback(
    (category: string) => {
      const getCount = (category: string) => {
        return (
          group.filter((item) => item.fieldValue === category)[0]?.totalCount ||
          0
        );
      };
      // Use switch instated of object
      switch (category) {
        case 'tech':
          return { count: getCount('tech'), img: FEImg };
        case 'leetcode':
          return { count: getCount('leetcode'), img: leetcodeImg };
        case 'snippet':
          return { count: getCount('snippet'), img: snippetImg };
        case 'essay':
          return { count: getCount('essay'), img: dialogImg };
      }
    },
    // eslint-disable-next-line
    [group, totalCount]
  );

  return (
    <section className={styles.wrap}>
      <div className={styles.title}>
        <MarkSvg className={styles.mark} />
        欢迎光临！博主 莫沉 是个前端菜狗，龟速学习中。
      </div>
      <Row gutter={16} justify="space-around">
        {cates.map((item) => (
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
                <Image
                  fixed={cateFilter(item.category).img.childImageSharp.fixed}
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
              <Meta
                title={item.name}
                description={`${cateFilter(item.category).count}篇文章`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default React.memo(CategoryComponent);
