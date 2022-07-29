import { useEffect, useCallback, useState, memo, ReactElement } from 'react';
import classnames from 'classnames';
import { Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { GithubOutlined, SearchOutlined } from '@ant-design/icons';

import { MyPlayer } from '../MyPlayer';
import { SearchDrawer } from '../Algolia';
import { useMedia, useHasMounted } from '../../hooks';
import * as styles from './index.module.less';
import { ThemeBtn } from './ThemeBtn';
import { MenuComponent } from './MenuComponent';
import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import { GetHeaderQuery } from '../../../graphql-types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  hasArrowAtom,
  headerDropAtom,
  sceneAtom,
  skipAtom,
  titleAtom,
} from '../../store/atom';

/**Header */
const Header = memo((): ReactElement | null => {
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<GetHeaderQuery>
  >(graphql`
    query getHeader {
      site {
        siteMetadata {
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

  const { social } = data.site.siteMetadata;
  const [searchVisible, setSearchVisible] = useState(false);
  const isDesktop = useMedia('isDesktop');
  const isMobile = useMedia('isMobile');
  const hasMounted = useHasMounted();

  const hasArrow = useRecoilValue(hasArrowAtom);
  const [scene, setScene] = useRecoilState(sceneAtom);
  const title = useRecoilValue(titleAtom);
  const [headerDrop, setHeaderDrop] = useRecoilState(headerDropAtom);
  const setSkip = useSetRecoilState(skipAtom);

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
  }, [setHeaderDrop, isMobile]);

  const handleArrow = useCallback(() => {
    setScene(true);
    setSkip(false);
    localStorage.setItem('SCENE', '1');
  }, [setScene, setSkip]);

  const handleClose = useCallback(() => setSearchVisible(false), []);

  return hasMounted ? (
    <header
      style={{
        top: scene ? '100vh' : '0',
      }}
      id="header"
      className={classnames(styles.wrapper, headerDrop && styles.active)}
    >
      <Row justify="space-around" align="middle">
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <MyPlayer />
        </Col>
        {!isMobile && (
          <Col className={styles.author}>
            {!isDesktop ? null : headerDrop && title ? (
              <span>{title}</span>
            ) : (
              <span
                className={styles.ora}
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/');
                }}
              >
                Orainsink's Blog
              </span>
            )}
          </Col>
        )}

        <Col flex={1} style={{ textAlign: 'right' }}>
          <MenuComponent drawer={isMobile} />
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchOutlined
            className={classnames(styles.icon, styles.search)}
            onClick={() => setSearchVisible(true)}
          />
          <GithubOutlined
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(social.github);
            }}
          />
          {!headerDrop && hasArrow && (
            <ArrowSvg className={styles.arrow} onClick={handleArrow} />
          )}
        </Col>
        <Col>
          <ThemeBtn />
        </Col>
      </Row>
      <SearchDrawer visible={searchVisible} onClose={handleClose} />
    </header>
  ) : null;
});

export default Header;
