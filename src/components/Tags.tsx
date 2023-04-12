import { ReactElement } from 'react';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import { useSetRecoilState } from 'recoil';
import { has } from 'ramda';
import styled from 'styled-components';

import { FILE_SYSTEM_CATEGORY_MAP } from '../assets/constants/categories';
import { useIsDark, useHasMounted } from '../hooks';
import { filterAtom } from '../store/atom';

interface Props {
  tags: readonly string[];
  category?: string;
}

const StyledTag = styled(Tag)`
  cursor: pointer;
`;

export const Tags = ({ tags, category }: Props): ReactElement | null => {
  const setFilter = useSetRecoilState(filterAtom);
  const isDark = useIsDark();
  const hasMounted = useHasMounted();

  const onTagClicked = (tag: string) => {
    setFilter({ curTag: tag?.trim() ?? '' });
  };

  if (
    !!category &&
    category !== 'tech' &&
    has(category, FILE_SYSTEM_CATEGORY_MAP)
  ) {
    let curCategory =
      FILE_SYSTEM_CATEGORY_MAP[
        category as keyof typeof FILE_SYSTEM_CATEGORY_MAP
      ];
    return (
      <div>
        <Link key={category} to={curCategory.path}>
          <StyledTag color={curCategory.tag || ''}>
            {curCategory.name}
          </StyledTag>
        </Link>
      </div>
    );
  }

  if (!tags?.length || !hasMounted) return null;
  return (
    <div>
      {tags.map((tag) => (
        <Link key={tag} onClick={() => onTagClicked(tag)} to={`/tech`}>
          <StyledTag
            color={isDark ? 'warning' : 'processing'}
            suppressHydrationWarning
          >
            #{tag}
          </StyledTag>
        </Link>
      ))}
    </div>
  );
};
