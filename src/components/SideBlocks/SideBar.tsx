import { ReactNode } from 'react';

import { useHasMounted } from '../../hooks';
import Calendar from './Calendar';
import Contents from './Contents';
import Info from './Info';
import TagsBlock from './TagsBlock';
import Tools from './Tools';

interface Props {
  children: ReactNode;
}
/**侧边栏 */
const SideBar = (props: Props) => {
  const { children } = props;

  const sideWrap = {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
  };

  const hasMounted = useHasMounted();

  return (
    hasMounted && (
      <div>
        <div style={sideWrap}>{children}</div>
      </div>
    )
  );
};

SideBar.Calendar = Calendar;
SideBar.Contents = Contents;
SideBar.Info = Info;
SideBar.TagsBlock = TagsBlock;
SideBar.Tools = Tools;

export default SideBar;
