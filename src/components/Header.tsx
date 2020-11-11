import React, { useEffect, useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { Link } from 'gatsby';
import { GithubOutlined, SearchOutlined } from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../hooks/useWindowSize';
import loadable from '@loadable/component';
import styles from '../styles/Header.module.less';
const MyPlayer = loadable(() => import('../components/MyPlayer'));
const MenuDrawer = loadable(() => import('../components/MenuDrawer'));
const SearchDrawer = loadable(() => import('../components/Algolia/Index'));
const isBrowser = typeof window !== `undefined`;
/**Header */
const Header: React.FC<{ location: any }> = ({ location }) => {
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
  const [active, setActive] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [width] = useWindowSize();
  const { hasArrow, scene, title } = useSelector((state) => state);

  useEffect(() => {
    if (width < 1024) {
      setTitleVisible(false);
    } else {
      setTitleVisible(true);
    }

    if (width < 600) {
      setDrawer(true);
    } else {
      setDrawer(false);
    }
  }, [width]);

  useEffect(() => {
    const _handleScroll = () => {
      if (width < 768) return setActive(false);
      if (document.body.scrollTop > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    /** change active status when component mounted */
    if (document.body.scrollTop > 0 && width >= 768) {
      setActive(true);
    }

    document.body.addEventListener('scroll', _handleScroll, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('scroll', _handleScroll);
    };
  }, [width]);

  const _handleArrow = useCallback(() => {
    dispatch({ type: 'SKIP', payload: false });
    dispatch({ type: 'SCENE', payload: true });
    isBrowser && localStorage.setItem('SCENE', '1');
  }, [dispatch]);

  const menu = useMemo(() => {
    if (drawer) {
      return <MenuDrawer location={location} />;
    } else
      return (
        <ul className={styles.nav}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/archives">archives</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      );
  }, [drawer, location]);

  return (
    <header
      style={{
        top: scene ? '100vh' : '0',
      }}
      id="header"
      className={classnames(styles.wrapper, active && styles.active)}
    >
      <Row justify="space-around" align="middle">
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <MyPlayer />
        </Col>
        {!drawer && (
          <Col className={styles.author}>
            {!titleVisible ? null : active && title ? (
              <span>{title}</span>
            ) : (
              <span
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/');
                }}
              >
                Orainsink'Blog
              </span>
            )}
          </Col>
        )}

        <Col flex={1} style={{ textAlign: 'right' }}>
          {menu}
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
          {!active && hasArrow && (
            <ArrowSvg className={styles.arrow} onClick={_handleArrow} />
          )}
        </Col>
      </Row>

      <SearchDrawer
        location={location}
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
    </header>
  );
};

export default React.memo(Header);
