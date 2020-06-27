import React, { useEffect, useState, useCallback } from 'react';
import styles from '../styles/TagsSnippet.module.less';
import { Row, Col, Card } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { ReactComponent as MarkSvg } from '../assets/img/mark.svg';

const { Meta } = Card;

interface IData {
  allMarkdownRemark: {
    group: {
      totalCount: number;
      tag: string;
    }[];
    totalCount: number;
  };
  FEImg: any;
  leetcodeImg: any;
  dialogImg: any;
  allImg: any;
}

/**首页-标签跳转 */
const TagsSnippet: React.FC = () => {
  const tags = [
    { tag: '前端', name: '前端' },
    { tag: 'leetcode', name: 'leetcode' },
    { tag: '随笔', name: '随笔' },
    { tag: '', name: '全部文章' },
  ];

  const data: IData = useStaticQuery(graphql`
    query TagsQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        group(field: frontmatter___tags) {
          totalCount
          tag: fieldValue
        }
        totalCount
      }
      FEImg: file(absolutePath: { regex: "/javascript.png/" }) {
        childImageSharp {
          fixed(width: 260, height: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      leetcodeImg: file(absolutePath: { regex: "/leetcode.png/" }) {
        childImageSharp {
          fixed(width: 260, height: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dialogImg: file(absolutePath: { regex: "/随笔.png/" }) {
        childImageSharp {
          fixed(width: 260, height: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      allImg: file(absolutePath: { regex: "/all.png/" }) {
        childImageSharp {
          fixed(width: 260, height: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { group, totalCount } = data.allMarkdownRemark;
  const { FEImg, leetcodeImg, dialogImg, allImg } = data;

  const tagFilter = useCallback(
    (tag) => {
      const getCout = (tag: string) => {
        return group.filter((item) => item.tag === tag)[0]?.totalCount || 0;
      };
      switch (tag) {
        case '前端':
          return { count: getCout('前端'), img: FEImg };
        case 'leetcode':
          return { count: getCout('leetcode'), img: leetcodeImg };
        case '随笔':
          return { count: getCout('随笔'), img: dialogImg };
        case '':
          return { count: totalCount, img: allImg };
      }
    },
    [group, totalCount]
  );

  return (
    <section className={styles.wrap}>
      <div className={styles.title}>
        <MarkSvg className={styles.mark} />
        欢迎光临本博客！博主是个前端菜狗，龟速学习中。
      </div>
      <Row gutter={16}>
        {tags.map((tag) => (
          <Col flex="1 0 200px" key={tag.name}>
            <Card
              hoverable
              className={styles.cardWrap}
              cover={
                <Image
                  fixed={tagFilter(tag.tag).img.childImageSharp.fixed}
                  alt={''}
                  style={{ width: '100%', transition: 'all 500ms ease' }}
                  className={styles.imgWrap}
                />
              }
            >
              <Meta
                title={tag.name}
                description={`${tagFilter(tag.tag).count}篇文章`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default React.memo(TagsSnippet);
