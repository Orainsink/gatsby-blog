import { memo, useCallback, ReactElement } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';

import { CATEGORY_MAP } from '../assets/constants/categories';
import { useHasMounted, useIsDark } from '../hooks';
interface Props {
  tags: string[];
  category?: string;
}
const Tags = ({ tags, category }: Props): ReactElement | null => {
  const dispatch = useDispatch();
  const isDark = useIsDark();
  const hasMounted = useHasMounted();

  const onTagClicked = useCallback(
    (tag: string) => {
      dispatch({
        type: 'CUR_TAG',
        payload: tag?.trim(),
      });
    },
    [dispatch]
  );

  if (!!category && category !== 'tech' && CATEGORY_MAP.has(category)) {
    let curCategory = CATEGORY_MAP.get(category)!;
    return (
      <div className="tags">
        <Link key={category} to={curCategory.path}>
          <Tag color={curCategory.tag} style={{ cursor: 'pointer' }}>
            {curCategory.name}
          </Tag>
        </Link>
      </div>
    );
  }

  if (!tags?.length || !hasMounted) return null;
  return (
    <div className="tags">
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
    </div>
  );
};

export default memo(Tags);
