import React, { useCallback } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
interface Props {
  tags: string[];
  categories?: string;
}
const Tags = ({ tags, categories }: Props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const onTagClicked = useCallback(
    (tag) => {
      dispatch({
        type: 'CUR_TAG',
        payload: tag.trim(),
      });
    },
    [dispatch]
  );
  if (categories === 'leetcode') {
    return (
      <p className="tags">
        <Link key="leetcode" to={`/leetcode`}>
          <Tag color="#F57109" style={{ cursor: 'pointer' }}>
            leetcode
          </Tag>
        </Link>
      </p>
    );
  }
  if (categories === 'snippet') {
    return (
      <p className="tags">
        <Link key="snippet" to={`/snippet`}>
          <Tag color="#2db7f5" style={{ cursor: 'pointer' }}>
            snippet
          </Tag>
        </Link>
      </p>
    );
  }
  if (categories === 'essay') {
    return (
      <p className="tags">
        <Link key="essay" to={`/essay`}>
          <Tag color="#87d068" style={{ cursor: 'pointer' }}>
            随笔
          </Tag>
        </Link>
      </p>
    );
  }

  return tags && tags.length ? (
    <p className="tags">
      {tags.map((tag) => (
        <Link key={tag} onClick={() => onTagClicked(tag)} to={`/archives`}>
          <Tag
            color={theme === 'dark' ? 'var(--tag-color)' : 'blue'}
            style={{ cursor: 'pointer' }}
          >
            #{tag}
          </Tag>
        </Link>
      ))}
    </p>
  ) : null;
};

export default React.memo(Tags);
