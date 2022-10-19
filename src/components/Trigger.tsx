import { ReactElement } from 'react';
import styled from 'styled-components';

import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { sceneAtom, skipAtom, triggerAtom } from '../store/atom';

const hideTriggerSelector = selector({
  key: 'hideTrigger',
  get: ({ get }) => {
    const skip = get(skipAtom);
    const scene = get(sceneAtom);

    return skip || !scene;
  },
});

const TriggerContainer = styled.div`
  position: fixed;
  z-index: 11;
  width: 100%;
  height: 80px;
  cursor: pointer;
  text-align: center;
  top: auto;
  bottom: 0;
`;

/**
 * scene Trigger
 */
export const Trigger = (): ReactElement | null => {
  const hideTrigger = useRecoilValue(hideTriggerSelector);
  const setScene = useSetRecoilState(sceneAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  if (hideTrigger) return null;

  return (
    <TriggerContainer
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
      onClick={() => {
        setScene(false);
        setTrigger(false);
      }}
    />
  );
};
