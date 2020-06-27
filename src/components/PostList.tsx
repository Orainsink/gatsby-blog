import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

interface IProp {
  posts: {
    node: {
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        description: string;
        tags: string[];
      };
      fields: {
        slug: string;
      };
    };
  }[];
}

const PostList: React.FC<IProp> = ({ posts }) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const onTagClicked = useCallback(
    (e) => {
      dispatch({
        type: 'SEARCH',
        payload: '#' + (e.currentTarget.dataset.tag || '').trim(),
      });
    },
    [dispatch]
  );

  const lowerCasePosts = useMemo(
    () =>
      posts.map(({ node: post }) => ({
        title: (post.frontmatter.title || '').toLowerCase(),
        description: (post.frontmatter.description || '').toLowerCase(),
        excerpt: (post.excerpt || '').toLowerCase(),
        tags: (post.frontmatter.tags || []).map((tag) =>
          (tag || '').toLowerCase()
        ),
      })),
    [posts]
  );

  useEffect(() => {
    if (search) {
      const lowerCaseText = search.toLowerCase();
      if (lowerCaseText[0] === '#') {
        const tag = lowerCaseText.slice(1);
        if (tag) {
          setFilteredPosts(
            posts.filter((_, i) => lowerCasePosts[i].tags.includes(tag))
          );
        }
      } else {
        setFilteredPosts(
          posts.filter(
            (_, i) =>
              lowerCasePosts[i].title.includes(lowerCaseText) ||
              lowerCasePosts[i].description.includes(lowerCaseText) ||
              lowerCasePosts[i].excerpt.includes(lowerCaseText)
          )
        );
      }
    } else {
      setFilteredPosts(posts);
    }
  }, [search, lowerCasePosts]);

  return (
    <>
      {filteredPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                style={{ color: 'rgb(0,0,0,0.45)' }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </>
  );
};
export default React.memo(PostList);
