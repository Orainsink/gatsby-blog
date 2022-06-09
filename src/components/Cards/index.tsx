import { memo, ReactElement } from 'react';
import { Card } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { ReactComponent as MarkSvg } from '../../assets/img/mark.svg';
import * as styles from './index.module.less';
import { GetTagsQuery } from '../../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';

const { Meta } = Card;

interface GroupItem {
  totalCount: number;
  fieldValue: string;
}

/**
 * get category count
 * @param category
 * @param group
 * @returns
 */
const getCount = (category: string, group: GroupItem[]): number => {
  return group.find((item) => item.fieldValue === category)?.totalCount || 0;
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

const CategoryComponent = (): ReactElement => {
  const data = useStaticQuery<DeepRequiredAndNonNullable<GetTagsQuery>>(graphql`
    query getTags {
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
        欢迎光临！博主 莫沉 是个切图仔，学习Go和webGL中。
      </div>
      <div className={styles.cardsContainer}>
        {getColumn(group).map((item) => (
          <Card
            key={item.name}
            hoverable
            className={styles.cardWrap}
            onClick={() => navigate(item.path)}
            cover={item.img}
          >
            <Meta title={item.name} description={`${item.count}篇文章`} />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default memo(CategoryComponent);
