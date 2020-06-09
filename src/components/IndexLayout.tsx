import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import styles from '../styles/layout.module.less';
import { MainContext } from '../context/MainContext';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  location: any;
  title: string;
  children?: any;
}
const Layout = ({ location, title, children }: IProps) => {
  const [state, dispatch] = useContext(MainContext);
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (state.scene) {
      body.style.overflowY = 'hidden';
      sessionStorage.setItem('skipscene', '1');
    } else {
      body.style.overflowY = 'scroll';
      // sessionStorage.removeItem('skipscene');
    }
  }, [state.scene]);

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
      className={classnames(
        styles.wrapper,
        !state.scene
          ? styles.disActive
          : state.trigger
          ? styles.trigger
          : styles.active
      )}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
