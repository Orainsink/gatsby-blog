export const windowWrapper = <T>(fn: () => T, initial: T): T => {
  if (typeof window === 'object') {
    return fn();
  } else return initial;
};
