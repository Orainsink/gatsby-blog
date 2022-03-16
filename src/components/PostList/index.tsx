import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';

import Tags from '../Tags';
import generatePath from '../../utils/generatePath';
import * as styles from './index.module.less';
import { iRootState } from '../../redux/store';
interface Props {
  posts: ChildMdxItem[];
  hideMore?: boolean;
}

interface PostItemType {
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  date: any;
}

const getLowerCasePosts = (posts: ChildMdxItem[]): PostItemType[] =>
  posts.map(({ node }) => ({
    title: (node.childMdx.frontmatter.title || '').toLowerCase(),
    description: (node.childMdx.frontmatter.description || '').toLowerCase(),
    excerpt: (node.childMdx.excerpt || '').toLowerCase(),
    tags: (node.childMdx.frontmatter.tags || []).map((tag) =>
      (tag || '').toLowerCase()
    ),
    date: node.childMdx.frontmatter.date,
  }));

const PostList = ({ posts, hideMore = false }: Props) => {
  const { curTag, curDate } = useSelector((state: iRootState) => state);
  const [filteredPosts, setFilteredPosts] = useState<ChildMdxItem[]>(posts);
  const [fold, setFold] = useState(true);

  const getIsAccordion  = useCallback((index) => {
    return index < 6 || !fold
  }, [fold]);

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
        const title =
          node.childMdx.frontmatter.title || node.childMdx.fields.slug;
        const { date, description, tags, categories } =
          node.childMdx.frontmatter;
          
        return getIsAccordion(index) ? (
          <article key={node.childMdx.fields.slug}>
            <header>
              <h3 className={styles.title}>
                <Link
                  to={generatePath(
                    node.childMdx.frontmatter.categories,
                    node.childMdx.fields.slug
                  )}
                >
                  {title}
                </Link>
              </h3>
              <small>{date}</small>
            </header>
            <section>
              <p
                className={styles.phrase}
                dangerouslySetInnerHTML={{
                  __html: description || node.childMdx.excerpt,
                }}
              />
              <Tags tags={tags} category={categories} />
            </section>
          </article>
        ) : null;
      })}
      {hideMore && filteredPosts?.length > 6 && (
        <div onClick={() => setFold(!fold)} className={styles.moreBtn}>
          <span>{fold ? '展开所有' : '收起'}</span>
        </div>
      )}
    </>
  );
};
export default React.memo(PostList);
