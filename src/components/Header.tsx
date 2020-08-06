import React, { useEffect, useCallback, useState, useMemo } from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Row, Col, Drawer, Button } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { Link } from 'gatsby';
import { GithubOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../hooks/useWindowSize';
import loadable from '@loadable/component';
const MyPlayer = loadable(() => import('../components/MyPlayer'));

/**抽屉菜单,用于移动端兼容 */
const MenuDrawer: React.FC<{ location: any }> = ({ location }) => {
  const [visible, setVisible] = useState(false);
  const { scene } = useSelector((state) => state);

  /**路径改变时关闭菜单 */
  useEffect(() => {
    setVisible(false);
  }, [location]);

  /**fix bug,当drawer关闭时,antd组件会重设body的style,导致滚动失效 */
  useEffect(() => {
    if (!visible) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = scene ? 'hidden' : 'auto';
    }
  }, [visible, scene]);

  return (
    <>
      <Button
        size="middle"
        ghost
        className={styles.drawerBtn}
        icon={<UnorderedListOutlined />}
        onClick={() => setVisible(true)}
      >
        MENU
      </Button>
      <Drawer
        title={<span className={styles.drawerTitle}>MENU</span>}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <ul className={classnames(styles.nav, styles.drawerNav)}>
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
      </Drawer>
    </>
  );
};

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
  const [titleVisible, setTitleVisible] = useState(true);
  const [width] = useWindowSize();
  const { hasArrow, scene, title } = useSelector((state) => state);

  useEffect(() => {
    if (width < 1024) {
      setTitleVisible(false);
    } else {
      setTitleVisible(true);
    }

    if (width < 468) {
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
      style={{ display: scene ? 'none' : 'block' }}
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
          <GithubOutlined
            className={styles.git}
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
    </header>
  );
};

export default React.memo(Header);
