import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'gatsby';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Tags } from './Tags';
import { generatePath } from '../utils/generatePath';
import { filterAtom } from '../store/atom';
import { FileEdge } from '../../typings/custom';

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

const MoreButton = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 1em 0;
  cursor: pointer;
`;

const Title = styled.h3`
  margin-bottom: 0.4em;
  box-shadow: none;
  a {
    color: var(--post-title);
  }
  a:hover {
    color: var(--post-title-hover);
  }
`;

const Phrase = styled.p`
  color: var(--color-text-secondary);
`;

const PostListItem = styled.article`
  padding: 1.5rem 0.7rem;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease-in;

  &:hover {
    color: var(--color-link);
  }
  &:active {
    color: var(--color-link-hover);
  }

  ${({ theme }) => theme.media.isMobile} {
    padding: 1.5rem 0;
  }
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
  }, [curDate, curTag, posts]);

  useEffect(() => {
    setFold(true);
  }, [curDate, curTag]);

  return (
    <>
      {filteredPosts.map(({ node }, index) => {
        const fields = node!.childMdx!.fields!;
        const frontmatter = node!.childMdx!.frontmatter!;
        const title = frontmatter.title || fields.slug || '';
        const { date, description, tags, categories } = frontmatter;

        return (
          getIsAccordion(index) && (
            <PostListItem key={fields.slug}>
              <header>
                <Title>
                  <Link to={generatePath(categories!, fields.slug!)}>
                    {title}
                  </Link>
                </Title>
                <small>{date}</small>
              </header>
              <section>
                <Phrase
                  dangerouslySetInnerHTML={{
                    __html: description || node!.childMdx!.excerpt || '',
                  }}
                />
                <Tags tags={tags as string[]} category={categories!} />
              </section>
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
