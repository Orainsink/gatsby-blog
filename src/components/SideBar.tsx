import React, { useMemo } from 'react';
import styles from '../styles/SideBar.module.less';
import { Col, Row, Tooltip } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Icon, {
  ZhihuOutlined,
  GithubOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { ReactComponent as SteamSvg } from '../assets/img/steam.svg';
import WordCloud from './WordCloud';
import classnames from 'classnames';

interface ISideBar {}
interface IData {
  avatar: any;
  moogle: any;
  wechat: any;
}
const SideBar: React.FC<ISideBar> = (props) => {
  const data: IData = useStaticQuery(graphql`
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
    <Col flex="0 1 300px" className={styles.sideWrap}>
      <Row align="top" justify="space-between">
        {/* Info */}
        <Col flex="300px" className={classnames(styles.InfoWrap, styles.col)}>
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
              >
                <ZhihuOutlined />
              </a>
              <a href="https://github.com/Orainsink" target="_blank">
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
        {/* wordCloud */}
        <Col
          flex="300px"
          className={classnames(styles.wordCloudWrap, styles.col)}
        >
          <div className={styles.title}>TAGS</div>
          <WordCloud />
        </Col>
      </Row>
    </Col>
  );
};
export default React.memo(SideBar);
