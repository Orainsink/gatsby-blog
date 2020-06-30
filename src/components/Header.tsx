import React, {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Row, Col, Drawer, Button } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { GithubOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import MyPlayer from '../components/MyPlayer';

/** resize hook */
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

/**抽屉菜单,用于移动端兼容 */
const MenuDrawer: React.FC<{ location: any }> = ({ location }) => {
  const [visible, setVisible] = useState(false);

  /**路径改变时关闭菜单 */
  useEffect(() => {
    setVisible(false);
  }, [location]);

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
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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

  const { author, social } = data.site.siteMetadata;
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [width, height] = useWindowSize();
  const { hasArrow } = useSelector((state) => state);

  useEffect(() => {
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
  }, []);

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
      id="header"
      className={classnames(styles.wrapper, active && styles.active)}
    >
      <Row justify="space-around" align="middle">
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          {/* <Image
            className={styles.avatar}
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name}
            imgStyle={{
              borderRadius: `50%`,
            }}
          /> */}
          <MyPlayer />
        </Col>
        {!drawer && (
          <Col className={styles.author}>
            <span>{"Orainsink'Blog"}</span>
          </Col>
        )}
        <Col flex={1} style={{ textAlign: 'right' }}>
          {menu}
        </Col>
        <Col span={drawer ? 8 : 4}>
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
