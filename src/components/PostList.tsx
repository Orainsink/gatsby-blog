import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';
import Tags from '../components/Tags';
import { Divider } from 'antd';

interface IProp {
  posts: IPostItem[];
}
const PostList: React.FC<IProp> = ({ posts }) => {
  const { curTag, curDate } = useSelector((state) => state);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [fold, setFold] = useState(true);

  const lowerCasePosts = useMemo(
    () =>
      posts.map(({ node: post }) => ({
        title: (post.frontmatter.title || '').toLowerCase(),
        description: (post.frontmatter.description || '').toLowerCase(),
        excerpt: (post.excerpt || '').toLowerCase(),
        tags: (post.frontmatter.tags || []).map((tag) =>
          (tag || '').toLowerCase()
        ),
        date: post.frontmatter.date,
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
        const title = node.frontmatter.title || node.fields.slug;
        const { date, description, tags } = node.frontmatter;
        return index < 6 || !fold ? (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: '0.4em',
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{date}</small>
            </header>
            <section>
              <p
                style={{ color: 'rgb(0,0,0,0.45)' }}
                dangerouslySetInnerHTML={{
                  __html: description || node.excerpt,
                }}
              />
              <Tags tags={tags} />
            </section>
          </article>
        ) : null;
      })}
      <Divider>
        <span onClick={() => setFold(false)}>展开所有</span>
      </Divider>
    </>
  );
};
export default React.memo(PostList);
