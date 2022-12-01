import { ReactElement } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useSetRecoilState } from 'recoil';

import { CATEGORY_MAP } from '../assets/constants/categories';
import { useIsDark, useHasMounted } from '../hooks';
import { filterAtom } from '../store/atom';

interface Props {
  tags: readonly string[];
  category?: string;
}

const pointerStyle = { cursor: 'pointer' };

export const Tags = ({ tags, category }: Props): ReactElement | null => {
  const setFilter = useSetRecoilState(filterAtom);
  const isDark = useIsDark();
  const hasMounted = useHasMounted();

  const onTagClicked = (tag: string) => {
    setFilter({ curTag: tag?.trim() ?? '' });
  };

  if (!!category && category !== 'tech' && CATEGORY_MAP.has(category)) {
    let curCategory = CATEGORY_MAP.get(category)!;
    return (
      <div>
        <Link key={category} to={curCategory.path}>
          <Tag color={curCategory.tag} style={pointerStyle}>
            {curCategory.name}
          </Tag>
        </Link>
      </div>
    );
  }

  if (!tags?.length || !hasMounted) return null;
  return (
    <div>
      {tags.map((tag) => (
        <Link key={tag} onClick={() => onTagClicked(tag)} to={`/tech`}>
          <Tag color={isDark ? 'warning' : 'processing'} style={pointerStyle}>
            #{tag}
          </Tag>
        </Link>
      ))}
    </div>
  );
};
