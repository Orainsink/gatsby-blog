import React, { useEffect, useCallback, useState, useMemo } from 'react';
import styles from '../styles/Header.module.less';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { GithubOutlined } from '@ant-design/icons';
import { ReactComponent as ArrowSvg } from '../assets/img/arrow.svg';
import { useDispatch } from 'react-redux';

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

  const _handleScroll = useCallback((e) => {
    if (document.body.clientWidth < 768) return setActive(false);
    if (document.body.scrollTop > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
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
        <Col flex={1}>
          <ul className={styles.nav}>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>tags</li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </ul>
        </Col>
        <Col span={3}>
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
