import { useState, useEffect } from 'react';
/**
 * https://joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
 * fix wrong html bug
 */
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};
export default useHasMounted;
