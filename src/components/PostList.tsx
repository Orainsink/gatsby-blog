import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'gatsby';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Tags } from './Tags';
import { generatePath } from '../utils/generatePath';
import { filterAtom } from '../store/atom';
import { FileEdge } from '../../typings/custom';
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
  posts: FileEdge[];
  hideMore?: boolean;
}

interface PostItem {
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  date: any;
}

const ItemTitle = styled(Title)`
  & > a {
    color: var(--color-mdx-header) !important;
    position: relative;
    transition: all 0.3s ease-out;
    &:hover,
    &:active,
    &:focus {
      color: var(--color-mdx-header-hover) !important;
    }

    &::after {
      background-color: var(--color-mdx-header-hover);
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 0;
      height: 3px;
      border-radius: var(--border-radius);
      color: inherit;
      transition: all 0.3s ease-out;
    }
    &:hover::after {
      width: 100% !important;
    }
  }
`;

const MoreButton = styled.div`
  text-align: center;
  font-size: var(--font-size-lg);
  padding: var(--space-md) 0;
  cursor: pointer;
`;

const Phrase = styled.p`
  color: var(--color-text-secondary);
`;

const PostListItem = styled(Typography)`
  padding: var(--space-lg) var(--space-sm);
  border-bottom: 1px solid var(--color-border);

  ${({ theme }) => theme.media.isMobile} {
    padding: 1.5rem 0;
  }
`;

const PostDate = styled.small`
  margin-bottom: var(--space-xs);
  display: inline-block;
`;

const getLowerCasePosts = (posts: FileEdge[]): PostItem[] =>
  posts.map(({ node }) => {
    const frontmatter = node.childMdx.frontmatter;

    return {
      title: (frontmatter.title || '').toLowerCase(),
      description: (frontmatter.description || '').toLowerCase(),
      excerpt: (node.childMdx.excerpt || '').toLowerCase(),
      tags: (frontmatter.tags || []).map((tag) => (tag || '').toLowerCase()),
      date: frontmatter.date,
    };
  });

export const PostList = ({ posts, hideMore = false }: Props): ReactElement => {
  const { curTag, curDate } = useRecoilValue(filterAtom);
  const [filteredPosts, setFilteredPosts] = useState<FileEdge[]>(posts);
  const [fold, setFold] = useState(true);

  const getIsAccordion = (index: number) => {
    return index < 6 || !fold;
  };

  /**
   * 过滤 / 筛选
   */
  useEffect(() => {
    const lowerCasePosts = getLowerCasePosts(posts);

    if (!curTag && !curDate) {
      setFilteredPosts(posts);
    }
    if (curTag) {
      setFilteredPosts(
        posts.filter((_, i) =>
          lowerCasePosts[i].tags.includes(curTag.toLowerCase())
        )
      );
    }
    if (curDate) {
      setFilteredPosts(
        posts.filter((_, i) => lowerCasePosts[i].date.includes(curDate))
      );
    }
    if (curTag && curDate) {
      console.warn('tag and date should not all be true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curDate, curTag]);

  useEffect(() => {
    setFold(true);
  }, [curDate, curTag]);

  return (
    <>
      {filteredPosts.map(({ node }, index) => {
        const fields = node.childMdx.fields;
        const frontmatter = node.childMdx.frontmatter;
        const title = frontmatter.title;
        const { date, description, tags, categories } = frontmatter;

        return (
          getIsAccordion(index) && (
            <PostListItem key={fields.slug}>
              <ItemTitle level={4}>
                <Link
                  to={generatePath(categories, title)}
                  className="ant-typography"
                >
                  {title}
                </Link>
              </ItemTitle>
              <PostDate>{date}</PostDate>
              <Phrase
                dangerouslySetInnerHTML={{
                  __html: description || node.childMdx.excerpt || '',
                }}
              />
              <Tags tags={tags as string[]} category={categories} />
            </PostListItem>
          )
        );
      })}
      {hideMore && filteredPosts?.length > 6 && (
        <MoreButton onClick={() => setFold(!fold)}>
          <span>{fold ? '展开所有' : '收起'}</span>
        </MoreButton>
      )}
    </>
  );
};
