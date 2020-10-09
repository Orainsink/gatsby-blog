import React, { useMemo } from 'react';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import { gittalkOptions } from '../assets/js/gittalk';
import 'gitalk/dist/gitalk.css';

interface Props {
  title?: string;
}
/**
 * gitalk comment component
 * @param {String} title - title
 */
const MyGitalk: React.FC<Props> = (props) => {
  const { title } = props;

  const renderGitalk = useMemo(() => {
    if (typeof window !== 'undefined') {
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
