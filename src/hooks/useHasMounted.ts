import { useState, useEffect } from 'react';
/**
 * https://joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
 * @notice fix wrong html bug, this bug drove me crazy.
 这是SSR的问题, 读了上面那篇文章才对SSR的原理有了更深入的了解.
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};
