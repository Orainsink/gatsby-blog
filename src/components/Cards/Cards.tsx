import { ReactElement } from 'react';
import { Card } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

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
const getCountString = (
  category: string,
  group: readonly GroupItem[]
): string | null => {
  const count =
    group.find((item) => item.fieldValue === category)?.totalCount || 0;

  return count ? `${count}篇文章` : null;
};
/**
 * get category info
 * @param group
 * @returns
 */
const getColumn = (group: readonly GroupItem[]) => {
  return [
    {
      category: 'resume',
      name: '简历',
      path: '/resume',
      description: '',
      img: (
        <StaticImage
          src="../../../content/assets/resume.png"
          alt="resume"
          placeholder="blurred"
          className="card-static-image"
        />
      ),
    },
    {
      category: 'snippet',
      name: '小抄',
      path: '/snippet',
      description: getCountString('snippet', group),
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
      description: getCountString('essay', group),
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
      path: '/tech',
      description: getCountString('tech', group),
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
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getTagsQuery>
  >(graphql`
    query getTags {
      allFile {
        totalCount
        group(field: { childMdx: { frontmatter: { categories: SELECT } } }) {
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
        欢迎光临！博主 莫沉 是个切图仔。
      </StyledTitle>
      <StyledCards>
        {getColumn(group).map((item) => (
          <StyledCard
            key={item.name}
            hoverable
            onClick={() => navigate(item.path)}
            cover={item.img}
            bodyStyle={{
              background: 'var(--color-bg-component)',
            }}
          >
            {<Meta title={item.name} description={item.description} />}
          </StyledCard>
        ))}
      </StyledCards>
    </CardSection>
  );
};
