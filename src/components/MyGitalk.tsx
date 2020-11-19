import React, { useMemo } from 'react';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import { gittalkOptions } from '../assets/js/gittalk';
import 'gitalk/dist/gitalk.css';
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

  const renderGitalk = useMemo(() => {
    if (isClient) {
      let gitalkConfig = {
        ...gittalkOptions,
        id: decodeURIComponent(window.location.pathname).substring(0, 49),
        title,
      };

      return <GitalkComponent options={gitalkConfig} />;
    }
  }, [title]);

  return <>{renderGitalk}</>;
};
export default React.memo(MyGitalk);
