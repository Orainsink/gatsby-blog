import { useEffect, useState, memo, ReactElement } from 'react';
import { Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { MyPlayer } from '../MyPlayer/MyPlayer';
import { SearchDrawer } from '../Algolia/SearchDrawer';
import { useMedia } from '../../hooks';
import { ThemeBtn } from './ThemeBtn';
import { MenuComponent } from './MenuComponent';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import {
  hasArrowAtom,
  headerDropAtom,
  sceneAtom,
  skipAtom,
} from '../../store/atom';
import {
  Arrow,
  Author,
  GithubIcon,
  HeaderContainer,
  Ora,
  SearchIcon,
} from './Header.styles';
import { useHasMounted } from '../../hooks';

/**Header */
export const Header = memo((): ReactElement | null => {
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getHeaderQuery>
  >(graphql`
    query getHeader {
      site {
        siteMetadata {
          title
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  const { social, title } = data.site.siteMetadata;
  const [searchVisible, setSearchVisible] = useState(false);
  const isDesktop = useMedia('isDesktop');
  const isMobile = useMedia('isMobile');
  const hasMounted = useHasMounted();

  const hasArrow = useRecoilValue(hasArrowAtom);
  const [scene, setScene] = useRecoilState(sceneAtom);
  const [headerDrop, setHeaderDrop] = useRecoilState(headerDropAtom);
  const setSkip = useSetRecoilState(skipAtom);
  const headerTitle = document.title.match(/(\S*)\s\|\s/)?.[1] ?? title;

  /**
   * scroll effects
   */
  useEffect(() => {
    const handleScroll: () => void = () => {
      if (isMobile) return setHeaderDrop(false);
      if (document.body.scrollTop > 0) {
        setHeaderDrop(true);
      } else {
        setHeaderDrop(false);
      }
    };

    /** change active status when component mounted */
    if (document.body.scrollTop > 0 && !isMobile) {
      setHeaderDrop(true);
    }

    document.body.addEventListener('scroll', handleScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleArrow = () => {
    setScene(true);
    setSkip(false);
    localStorage.setItem('SCENE', '1');
  };

  const showTitle = isDesktop;
  const renderTitle = () =>
    headerDrop ? (
      <span>{headerTitle}</span>
    ) : (
      <Ora
        onClick={(event) => {
          event.preventDefault();
          navigate('/');
        }}
      >
        Orainsink's Blog
      </Ora>
    );

  return hasMounted ? (
    <HeaderContainer
      style={{
        top: scene ? '100vh' : '0',
      }}
      id="header"
      active={headerDrop}
    >
      <Row justify="space-around" align="middle">
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <MyPlayer />
        </Col>
        {!isMobile && <Author>{showTitle && renderTitle()}</Author>}

        <Col flex={1} style={{ textAlign: 'right' }}>
          <MenuComponent drawer={isMobile} />
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchIcon onClick={() => setSearchVisible(true)} />
          <GithubIcon
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(social.github);
            }}
          />
          {!headerDrop && hasArrow && <Arrow onClick={handleArrow} />}
        </Col>
        <Col>
          <ThemeBtn />
        </Col>
      </Row>
      <SearchDrawer
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
    </HeaderContainer>
  ) : null;
});
