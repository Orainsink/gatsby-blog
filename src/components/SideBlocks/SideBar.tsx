import { ReactNode, ReactElement } from 'react';

interface Props {
  children: ReactNode;
}
/**侧边栏 */
const SideBar = (props: Props): ReactElement => {
  const { children } = props;

  const sideWrap = {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
  };

  return (
    <div>
      <div style={sideWrap}>{children}</div>
    </div>
  );
};

export default SideBar;
