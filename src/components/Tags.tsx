import React, { useCallback } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
  const dispatch = useDispatch();

  const onTagClicked = useCallback(
    (tag) => {
      dispatch({
        type: 'SEARCH',
        payload: '#' + (tag || '').trim(),
      });
    },
    [dispatch]
  );

  return tags && tags.length ? (
    <p className="tags">
      {tags.map((tag) => (
        <Link key={tag} onClick={() => onTagClicked(tag)} to={`/archives`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            #{tag}
          </Tag>
        </Link>
      ))}
    </p>
  ) : null;
};

export default React.memo(Tags);
