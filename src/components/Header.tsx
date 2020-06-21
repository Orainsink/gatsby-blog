import React, { useEffect, useCallback, useState, useMemo } from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Row, Col, Drawer, Button } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { GithubOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch } from 'react-redux';

/**抽屉菜单,用于移动端兼容 */
const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
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
          <li>tags</li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

/**Header */
const Header: React.FC = () => {
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

  const { author } = data.site.siteMetadata;
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(1280);
  const [drawer, setDrawer] = useState(false);

  console.log(width);

  const _handleScroll = useCallback(
    (e) => {
      if (width < 768) return setActive(false);
      if (document.body.scrollTop > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    },
    [width]
  );

  useEffect(() => {
    if (width < 468) {
      setDrawer(true);
    } else {
      setDrawer(false);
    }
  }, [width]);

  const onResize = useCallback((e) => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize, { passive: false });

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.addEventListener('scroll', _handleScroll, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('scroll', _handleScroll);
    };
  }, []);

  const _handleArrow = useCallback(() => {
    dispatch({ type: 'SCENE', payload: true });
  }, []);

  const menu = useMemo(() => {
    console.log(document.body.clientWidth);
    if (drawer) {
      return <MenuDrawer />;
    } else
      return (
        <ul className={styles.nav}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>tags</li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      );
  }, [drawer]);

  return (
    <header className={classnames(styles.wrapper, active && styles.active)}>
      <Row justify="space-around" align="middle">
        <Col span={2} style={{ textAlign: 'end' }}>
          <Image
            className={styles.avatar}
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        </Col>
        <Col flex={1}>{menu}</Col>
        <Col span={4}>
          <GithubOutlined
            className={styles.git}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open('https://github.com/Orainsink');
            }}
          />
          {!active && (
            <ArrowSvg className={styles.arrow} onClick={_handleArrow} />
          )}
        </Col>
      </Row>
    </header>
  );
};

export default React.memo(Header);
