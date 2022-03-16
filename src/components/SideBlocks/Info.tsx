import React, { useMemo } from 'react';
import { Col, Tooltip } from 'antd';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import Icon, {
  ZhihuOutlined,
  GithubOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';

import { ReactComponent as SteamSvg } from '../../assets/img/steam.svg';
import { useMedia } from '../../hooks';
import * as styles from './index.module.less';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme } from '../../assets/constants/common';
import { useIsDark } from '../../hooks/useIsDark';
interface Data {
  avatar: any;
  avatarD: any;
}
/**个人信息块 */
const Info = () => {
  const isDark = useIsDark()
  const is1100 = useMedia('(max-width: 1100px)');

  const data: Data = useStaticQuery(graphql`
    query sideQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 200
            height: 200
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
      avatarD: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 200
            height: 200
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  `);
  const avatar = getImage(isDark ? data.avatarD : data.avatar);

  const weChatRender = useMemo(() => {
    return (
      <div className={styles.wechatWrap}>
        <h3>ID：Orainsink</h3>
        <StaticImage
          src="../../../content/assets/wechat.png"
          alt=""
          width={100}
          height={100}
          layout="fixed"
          placeholder="blurred"
        />
        <div>
          微信在线<del>相亲</del>交友
        </div>
      </div>
    );
  }, []);

  const steamRender = useMemo(() => {
    return (
      <div className={styles.steamWrap}>
        <h3>ID：Moogle Knight</h3>
        <StaticImage
          src="../../../content/assets/moogle.png"
          alt=""
          width={100}
          height={100}
          layout="fixed"
          placeholder="blurred"
        />
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
      <GatsbyImage image={avatar} alt="" className={styles.avatar} />
      <div className={styles.titleWrap}>
        <div className={styles.title}>ABOUT</div>
        <div>{isDark ? 'Orainsink' : '莫沉'}</div>
        <div>
          {isDark ? 'listen, feel, think' : '倾听, 感受, 思考'}
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
          <Tooltip title={weChatRender}>
            <WechatOutlined />
          </Tooltip>
          <Tooltip title={steamRender}>
            <Icon component={SteamSvg} />
          </Tooltip>
        </div>
      </div>
    </Col>
  );
};
export default React.memo(Info);
