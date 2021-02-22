import React, { useCallback } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { iRootState } from '../redux/store';
import { categoryColumn } from '../assets/config/categories';
interface Props {
  tags: string[];
  categories?: string;
}
const Tags = ({ tags, categories }: Props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: iRootState) => state.theme);

  const onTagClicked = useCallback(
    (tag: string) => {
      dispatch({
        type: 'CUR_TAG',
        payload: tag?.trim(),
      });
    },
    [dispatch]
  );

  if (categories !== 'tech' && categoryColumn.hasOwnProperty(categories)) {
    let curCategory = categoryColumn[categories];
    return (
      <p className="tags">
        <Link key={categories} to={curCategory.path}>
          <Tag color={curCategory.tag} style={{ cursor: 'pointer' }}>
            {curCategory.name}
          </Tag>
        </Link>
      </p>
    );
  }

  return (
    tags?.length && (
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
    )
  );
};

export default React.memo(Tags);
