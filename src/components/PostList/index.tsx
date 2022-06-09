import { memo, useState, useEffect, useCallback, ReactElement } from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';

import Tags from '../Tags';
import generatePath from '../../utils/generatePath';
import * as styles from './index.module.less';
import { iRootState } from '../../redux/store';
import { FileEdge } from '../../../graphql-types';
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

const getLowerCasePosts = (posts: FileEdge[]): PostItem[] =>
  posts.map(({ node }) => {
    const frontmatter = node!.childMdx!.frontmatter!;

    return {
      title: (frontmatter.title || '').toLowerCase(),
      description: (frontmatter.description || '').toLowerCase(),
      excerpt: (node!.childMdx!.excerpt || '').toLowerCase(),
      tags: (frontmatter.tags || []).map((tag) => (tag || '').toLowerCase()),
      date: frontmatter.date,
    };
  });

const PostList = ({ posts, hideMore = false }: Props): ReactElement => {
  const { curTag, curDate } = useSelector((state: iRootState) => state);
  const [filteredPosts, setFilteredPosts] = useState<FileEdge[]>(posts);
  const [fold, setFold] = useState(true);

  const getIsAccordion = useCallback(
    (index: number) => {
      return index < 6 || !fold;
    },
    [fold]
  );

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
            <article key={fields.slug}>
              <header>
                <h3 className={styles.title}>
                  <Link to={generatePath(categories!, fields.slug!)}>
                    {title}
                  </Link>
                </h3>
                <small>{date}</small>
              </header>
              <section>
                <p
                  className={styles.phrase}
                  dangerouslySetInnerHTML={{
                    __html: description || node!.childMdx!.excerpt || '',
                  }}
                />
                <Tags tags={tags as string[]} category={categories!} />
              </section>
            </article>
          )
        );
      })}
      {hideMore && filteredPosts?.length > 6 && (
        <div onClick={() => setFold(!fold)} className={styles.moreBtn}>
          <span>{fold ? '展开所有' : '收起'}</span>
        </div>
      )}
    </>
  );
};
export default memo(PostList);
