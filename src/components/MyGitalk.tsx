import React, { useMemo } from 'react';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import { gittalkOptions } from '../assets/js/gittalk';
import 'gitalk/dist/gitalk.css';
import { useHasMounted } from '../hooks';
import isClient from '../utils/isClient';

interface Props {
  title?: string;
}
/**
 * gitalk comment component
 * @param {String} title - title
 */
const MyGitalk = (props: Props) => {
  const { title } = props;

  const hasMounted = useHasMounted();

  const gitalkConfig = useMemo(
    () =>
      isClient
        ? {
            ...gittalkOptions,
            id: decodeURIComponent(window?.location.pathname).substring(0, 49),
            title,
          }
        : null,
    [title]
  );

  return hasMounted ? <GitalkComponent options={gitalkConfig} /> : <></>;
};
export default React.memo(MyGitalk);
