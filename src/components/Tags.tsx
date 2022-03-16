import React, { useCallback } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';

import { CATEGORY_MAP } from '../assets/constants/categories';
import { useIsDark } from '../hooks/useIsDark';
interface Props {
  tags: string[];
  category?: string;
}
const Tags = ({ tags, category }: Props) => {
  const dispatch = useDispatch();
  const isDark = useIsDark()

  const onTagClicked = useCallback(
    (tag: string) => {
      dispatch({
        type: 'CUR_TAG',
        payload: tag?.trim(),
      });
    },
    [dispatch]
  );

  if (category !== 'tech' && CATEGORY_MAP.has(category)) {
    let curCategory = CATEGORY_MAP.get(category);
    return (
      <p className="tags">
        <Link key={category} to={curCategory.path}>
          <Tag color={curCategory.tag} style={{ cursor: 'pointer' }}>
            {curCategory.name}
          </Tag>
        </Link>
      </p>
    );
  }

  return (
    !!tags?.length && (
      <p className="tags">
        {tags.map((tag) => (
          <Link key={tag} onClick={() => onTagClicked(tag)} to={`/archives`}>
            <Tag
              color={isDark ? 'var(--tag-color)' : 'blue'}
              style={{ cursor: 'pointer' }}
            >
              #{tag}
            </Tag>
          </Link>
        ))}
      </p>
    )
  );
};

export default React.memo(Tags);
