import React, { useMemo } from 'react';
import { Col, Tooltip } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Icon, {
  ZhihuOutlined,
  GithubOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { ReactComponent as SteamSvg } from '../../assets/img/steam.svg';
import classnames from 'classnames';
import { useMedia } from '../../hooks';
import styles from '../../styles/SideBar.module.less';

interface Data {
  avatar: any;
  moogle: any;
  wechat: any;
}
/**个人信息块 */
const Info = () => {
  const data: Data = useStaticQuery(graphql`
    query sideQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      moogle: file(absolutePath: { regex: "/moogle.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      wechat: file(absolutePath: { regex: "/wechat.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { avatar, wechat, moogle } = data;
  const is1100 = useMedia('(max-width: 1100px)');

  const weChatContent = useMemo(() => {
    return (
      <div className={styles.wechatWrap}>
        <h3>ID：Orainsink</h3>
        <Image fixed={wechat.childImageSharp.fixed} alt="" />
        <div>
          微信在线<del className={styles.delText}>相亲</del>交友
        </div>
      </div>
    );
  }, [wechat]);

  const steamContent = useMemo(() => {
    return (
      <div className={styles.steamWrap}>
        <h3>ID：Moogle Knight</h3>
        <Image fixed={moogle.childImageSharp.fixed} alt="" />
        <div>重度RPG玩家，受苦爱好者</div>
        <div>
          <del>你玩手游吗？什么你居然不玩游戏？</del>
        </div>
      </div>
    );
  }, [moogle]);

  return (
    <Col
      flex={is1100 ? '1 1 300px' : '0 0 300px'}
      className={classnames(styles.InfoWrap, styles.col)}
    >
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt=""
        className={styles.avatar}
      />
      <div className={styles.titleWrap}>
        <div className={styles.title}>ABOUT</div>
        <div>莫沉</div>
        <div>倾听, 感受, 思考</div>
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
            <GithubOutlined />
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
