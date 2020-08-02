import React, { useMemo } from 'react';
// @ts-ignore
import GitalkComponent from 'gitalk/dist/gitalk-component';
import { gittalkOptions } from '../assets/js/gittalk';
import 'gitalk/dist/gitalk.css';

interface IMyGitalk {
  title?: string;
}
const MyGitalk: React.FC<IMyGitalk> = (props) => {
  const { title } = props;

  let gitalkConfig = {
    ...gittalkOptions,
    id: decodeURIComponent(location.pathname).substring(0, 49),
    title,
  };

  const renderGitalk = useMemo(() => {
    if (typeof window !== 'undefined') {
      return <GitalkComponent options={gitalkConfig} />;
    }
  }, []);
  return <>{renderGitalk}</>;
};
export default React.memo(MyGitalk);
