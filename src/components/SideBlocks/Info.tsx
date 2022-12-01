import { ReactElement } from 'react';
import { Tooltip } from 'antd';
import {
  StaticImage,
  GatsbyImage,
  getImage,
  ImageDataLike,
} from 'gatsby-plugin-image';
import Icon, {
  ZhihuOutlined,
  GithubOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';

import { ReactComponent as SteamSvg } from '../../assets/img/steam.svg';
import { useMedia, useIsDark } from '../../hooks';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import { BaseCol, Title } from './SideBlocks.styles';

const StyledTitle = styled(Title)`
  z-index: -1;
`;

const tooltipContainerSharedStyles = css`
  display: flex;
  padding: 10px;
  color: var(--color-text);

  del {
    color: var(--color-text-secondary);
    font-size: 12px;
  }
`;

const SteamContainer = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  ${tooltipContainerSharedStyles}
`;

const WechatContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  ${tooltipContainerSharedStyles}
`;

const InfoContainer = styled(BaseCol)`
  display: flex;
  flex-flow: column;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;

  & .owner-avatar-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    touch-action: none;
    position: relative;
    z-index: 1;
    pointer-events: none;
    user-select: none;
  }
`;

const Bloger = styled.div`
  z-index: 1;
  position: relative;
  text-align: center;
  color: var(--color-text);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-lg);
`;

const Motto = styled.div`
  z-index: 1;
  position: relative;
  text-align: center;
  color: var(--color-text-secondary);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  margin-top: 10px;
  > * {
    margin: 0 10px;
  }
`;

const iconStyle = css`
  color: var(--color-text);
`;

const StyledZhihuOutlined = styled(ZhihuOutlined)`
  ${iconStyle}
`;

const StyledGithubOutlined = styled(GithubOutlined)`
  ${iconStyle}
`;

const StyledWechatOutlined = styled(WechatOutlined)`
  ${iconStyle}
`;

const StyledSteamIcon = styled(Icon)`
  ${iconStyle}
`;

const Steam = (): ReactElement => (
  <SteamContainer>
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
  </SteamContainer>
);

const Wechat = (): ReactElement => (
  <WechatContainer>
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
  </WechatContainer>
);

/**个人信息块 */
export const Info = () => {
  const isDark = useIsDark();
  const isDesktop = useMedia('isDesktop');

  const data = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getSelfInfoQuery>
  >(graphql`
    query getSelfInfo {
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

  const avatar = getImage(
    (isDark ? data.avatarD : data.avatar) as ImageDataLike
  );

  return (
    <InfoContainer flex={isDesktop ? '0 0 300px' : '1 1 300px'}>
      <GatsbyImage image={avatar!} alt="" className="owner-avatar-image" />
      <StyledTitle>ABOUT</StyledTitle>
      <div>
        <Bloger>{isDark ? 'Orainsink' : '莫沉'}</Bloger>
        <Motto>{isDark ? 'listen, feel, think' : '倾听, 感受, 思考'}</Motto>
        <IconContainer>
          <a
            href="https://www.zhihu.com/people/f6e5b2cbbe6e9535239e41b51305bf2c?utm_source=qq&utm_medium=social&utm_oi=586439395150794752"
            target="_blank"
            rel="noreferrer"
          >
            <StyledZhihuOutlined />
          </a>
          <a
            href="https://github.com/Orainsink"
            target="_blank"
            rel="noreferrer"
          >
            <StyledGithubOutlined />
          </a>
          <Tooltip title={<Wechat />} color="var(--color-bg-container)">
            <StyledWechatOutlined />
          </Tooltip>
          <Tooltip title={<Steam />} color="var(--color-bg-container)">
            <StyledSteamIcon component={SteamSvg} />
          </Tooltip>
        </IconContainer>
      </div>
    </InfoContainer>
  );
};
