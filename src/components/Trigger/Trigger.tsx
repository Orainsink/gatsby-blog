import { ReactElement } from 'react';

import * as styles from './Trigger.module.less';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { sceneAtom, skipAtom, triggerAtom } from '../../store/atom';

const hideTriggerSelector = selector({
  key: 'hideTrigger',
  get: ({ get }) => {
    const skip = get(skipAtom);
    const scene = get(sceneAtom);

    return skip || !scene;
  },
});

/**
 * scene Trigger
 */
export const Trigger = (): ReactElement | null => {
  const hideTrigger = useRecoilValue(hideTriggerSelector);
  const setScene = useSetRecoilState(sceneAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  if (hideTrigger) return null;

  return (
    <div
      className={styles.trigger}
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
      onClick={() => {
        setScene(false);
        setTrigger(false);
      }}
    />
  );
};
