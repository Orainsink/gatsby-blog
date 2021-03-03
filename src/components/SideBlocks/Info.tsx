import React, { useMemo } from 'react';
import { Col, Tooltip } from 'antd';
import { StaticImage } from 'gatsby-plugin-image';
import Icon, {
  ZhihuOutlined,
  GithubOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { ReactComponent as SteamSvg } from '../../assets/img/steam.svg';
import classnames from 'classnames';
import { useMedia } from '../../hooks';
import styles from '../../styles/SideBar.module.less';
import { useSelector } from 'react-redux';
import { iRootState } from '../../redux/store';
import wechat from '../../assets/img/wechat.png';
import moogle from '../../assets/img/moogle.png';
import avatarD from '../../assets/img/avatarD.png';
import avatar from '../../assets/img/avatar.png';

/**个人信息块 */
const Info = () => {
  const theme = useSelector((state: iRootState) => state.theme);
  const is1100 = useMedia('(max-width: 1100px)');

  const weChatContent = useMemo(() => {
    return (
      <div className={styles.wechatWrap}>
        <h3>ID：Orainsink</h3>
        <StaticImage src={wechat} alt="" width={100} height={100} />
        <div>
          微信在线<del className={styles.delText}>相亲</del>交友
        </div>
      </div>
    );
  }, []);

  const steamContent = useMemo(() => {
    return (
      <div className={styles.steamWrap}>
        <h3>ID：Moogle Knight</h3>
        <StaticImage src={moogle} alt="" width={100} height={100} />
        <div>重度RPG玩家，受苦爱好者</div>
        <div>
          <del>你玩手游吗？什么你居然不玩游戏？</del>
        </div>
      </div>
    );
  }, []);

  return (
    <Col
      flex={is1100 ? '1 1 300px' : '0 0 300px'}
      className={classnames(styles.InfoWrap, styles.col)}
    >
      <StaticImage
        src={theme === 'dark' ? avatarD : avatar}
        width={100}
        height={100}
        alt=""
        className={styles.avatar}
      />
      <div className={styles.titleWrap}>
        <div className={styles.title}>ABOUT</div>
        <div>{theme === 'dark' ? 'Orainsink' : '莫沉'}</div>
        <div>
          {theme === 'dark' ? 'listen, feel, think' : '倾听, 感受, 思考'}
        </div>
        <div className={styles.iconWrap}>
          <a
            href="https://www.zhihu.com/people/f6e5b2cbbe6e9535239e41b51305bf2c?utm_source=qq&utm_medium=social&utm_oi=586439395150794752"
            target="_blank"
            rel="noreferrer"
          >
            <ZhihuOutlined className={styles.icon} />
          </a>
          <a
            href="https://github.com/Orainsink"
            target="_blank"
            rel="noreferrer"
          >
            <GithubOutlined className={styles.icon} />
          </a>
          <Tooltip title={weChatContent}>
            <WechatOutlined />
          </Tooltip>
          <Tooltip title={steamContent}>
            <Icon component={SteamSvg} />
          </Tooltip>
        </div>
      </div>
    </Col>
  );
};
export default React.memo(Info);
