import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';
import Tags from '../components/Tags';
import generatePath from '../utils/generatePath';
interface Props {
  posts: ChildMdxItem[];
  hideMore?: boolean;
}
const PostList = ({ posts, hideMore = false }: Props) => {
  const { curTag, curDate } = useSelector((state: any) => state);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [fold, setFold] = useState(true);

  const lowerCasePosts = useMemo(
    () =>
      posts.map(({ node }) => ({
        title: (node.childMdx.frontmatter.title || '').toLowerCase(),
        description: (
          node.childMdx.frontmatter.description || ''
        ).toLowerCase(),
        excerpt: (node.childMdx.excerpt || '').toLowerCase(),
        tags: (node.childMdx.frontmatter.tags || []).map((tag) =>
          (tag || '').toLowerCase()
        ),
        date: node.childMdx.frontmatter.date,
      })),
    [posts]
  );

  useEffect(() => {
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
  }, [curDate, curTag, lowerCasePosts, posts]);

  useEffect(() => {
    setFold(true);
  }, [curDate, curTag]);

  return (
    <>
      {filteredPosts.map(({ node }, index) => {
        const title =
          node.childMdx.frontmatter.title || node.childMdx.fields.slug;
        const {
          date,
          description,
          tags,
          categories,
        } = node.childMdx.frontmatter;
        return index < 6 || !fold ? (
          <article key={node.childMdx.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: '0.4em',
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={generatePath(
                    node.childMdx.frontmatter.categories,
                    node.childMdx.id
                  )}
                >
                  {title}
                </Link>
              </h3>
              <small>{date}</small>
            </header>
            <section>
              <p
                style={{ color: 'rgb(0,0,0,0.45)' }}
                dangerouslySetInnerHTML={{
                  __html: description || node.childMdx.excerpt,
                }}
              />
              <Tags tags={tags} categories={categories} />
            </section>
          </article>
        ) : null;
      })}
      {hideMore && filteredPosts?.length > 6 && (
        <div
          onClick={() => setFold(!fold)}
          style={{
            textAlign: 'center',
            fontSize: '18px',
            padding: '1em 0',
            cursor: 'pointer',
          }}
        >
          <span>{fold ? '展开所有' : '收起'}</span>
        </div>
      )}
    </>
  );
};
export default React.memo(PostList);
