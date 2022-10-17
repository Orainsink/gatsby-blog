import { ReactElement } from 'react';
import { Card } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { GetTagsQuery } from '../../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import {
  CardSection,
  StyledTitle,
  StyledMarkSvg,
  StyledCards,
  StyledCard,
} from './Card.styles';

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
          placeholder="blurred"
          className="card-static-image"
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
          placeholder="blurred"
          className="card-static-image"
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
          placeholder="blurred"
          className="card-static-image"
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
          placeholder="blurred"
          className="card-static-image"
        />
      ),
    },
  ];
};

export const CategoryComponent = (): ReactElement => {
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
    <CardSection>
      <StyledTitle>
        <StyledMarkSvg />
        欢迎光临！博主 莫沉 是个切图仔，学习Go和webGL中。
      </StyledTitle>
      <StyledCards>
        {getColumn(group).map((item) => (
          <StyledCard
            key={item.name}
            hoverable
            onClick={() => navigate(item.path)}
            cover={item.img}
          >
            <Meta title={item.name} description={`${item.count}篇文章`} />
          </StyledCard>
        ))}
      </StyledCards>
    </CardSection>
  );
};
