import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

export const DebugObserver = (): React.ReactElement | null => {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    const state = {} as any;

    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }

    for (const node of snapshot.getNodes_UNSTABLE()) {
      state[node.key] = snapshot.getLoadable(node).contents;
    }

    console.debug('store', state);
  }, [snapshot]);

  return null;
};
