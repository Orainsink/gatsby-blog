import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';
import classnames from 'classnames';
import { Row, Col, Dropdown } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { Link } from 'gatsby';
import {
  GithubOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../hooks/useWindowSize';
import useMagicColor from '../hooks/useMagicColor';
import loadable from '@loadable/component';
import styles from '../styles/Header.module.less';
const MyPlayer = loadable(() => import('../components/MyPlayer'));
const MenuDrawer = loadable(() => import('../components/MenuDrawer'));
const SearchDrawer = loadable(() => import('../components/Algolia/Index'));
const isBrowser = typeof window !== `undefined`;

const ArchivesMenu = React.memo(({ visible }: { visible: boolean }) => {
  const magicRef = useRef(null);
  useMagicColor(magicRef.current, visible);

  const refCallback = useCallback((node) => {
    if (node !== null) {
      magicRef.current = node;
    }
  }, []);

  return (
    <div className={styles.dropMenu} ref={refCallback}>
      <Row align="middle" justify="space-between">
        <Col span={12} className={styles.cls}>
          <Link to="/archives">技术</Link>
        </Col>
        <Col span={12} className={styles.cls}>
          <Link to="/leetcode">Leetcode</Link>
        </Col>
      </Row>
      <Row align="middle" justify="space-between">
        <Col span={12} className={styles.cls}>
          <Link to="/snippet">Snippet</Link>
        </Col>
        <Col span={12} className={styles.cls}>
          <Link to="/essay">随笔</Link>
        </Col>
      </Row>
    </div>
  );
});

const MenuComponent = React.memo(({ drawer }: { drawer: boolean }) => {
  const [visible, setVisible] = useState(false);
  if (drawer) {
    return <MenuDrawer />;
  } else
    return (
      <ul className={styles.nav}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Dropdown
            overlay={<ArchivesMenu visible={visible} />}
            arrow
            overlayClassName={styles.dropWrapper}
            onVisibleChange={(visible) => setVisible(visible)}
          >
            <span>
              archives <DownOutlined />
            </span>
          </Dropdown>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    );
});

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
  const [drawer, setDrawer] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [width] = useWindowSize();
  const { hasArrow, scene, title, headerDrop } = useSelector(
    (state: any) => state
  );

  const setActive = useCallback(
    (active) => dispatch({ type: 'HEADER_DROP', payload: active }),
    [dispatch]
  );

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
  }, [width, setActive]);

  const _handleArrow = useCallback(() => {
    dispatch({ type: 'SKIP', payload: false });
    dispatch({ type: 'SCENE', payload: true });
    isBrowser && localStorage.setItem('SCENE', '1');
  }, [dispatch]);

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
                style={{ cursor: 'pointer' }}
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
