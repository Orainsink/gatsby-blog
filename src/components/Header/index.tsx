import { useEffect, useCallback, useState, memo } from 'react';
import classnames from 'classnames';
import { Col, Row } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { GithubOutlined, SearchOutlined } from '@ant-design/icons';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { useMedia } from '../../hooks';
import * as styles from './index.module.less';
import ThemeBtn from './ThemeBtn';
import MenuComponent from './MenuComponent';
import { iRootState } from '../../redux/store';
import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
const MyPlayer = loadable(() => import('../MyPlayer'));
const SearchDrawer = loadable(() => import('../../components/Algolia/Index'));

/**Header */
const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
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
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const isDesktop = useMedia('isDesktop');
  const isMobile = useMedia('isMobile');

  const { hasArrow, scene, title, headerDrop } = useSelector(
    (state: iRootState) => state
  );

  const setActive = useCallback(
    (active) => dispatch({ type: 'HEADER_DROP', payload: active }),
    [dispatch]
  );

  useEffect(() => {
    setTitleVisible(isDesktop);
    setDrawer(isMobile);
  }, [isDesktop, isMobile]);

  /**
   * scroll effects
   */
  useEffect(() => {
    const handleScroll: () => void = () => {
      if (isMobile) return setActive(false);
      if (document.body.scrollTop > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    /** change active status when component mounted */
    if (document.body.scrollTop > 0 && !isMobile) {
      setActive(true);
    }

    document.body.addEventListener('scroll', handleScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, [setActive, isMobile]);

  const handleArrow = useCallback(() => {
    dispatch({ type: 'SKIP', payload: false });
    dispatch({ type: 'SCENE', payload: true });
    globalThis.localStorage?.setItem('SCENE', '1');
  }, [dispatch]);

  const handleClose = useCallback(() => setSearchVisible(false), []);

  return (
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
        {!drawer && (
          <Col className={styles.author}>
            {!titleVisible ? null : headerDrop && title ? (
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
          <MenuComponent drawer={drawer} />
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
  );
};

export default memo(Header);
