import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import styles from '../styles/layout.module.less';
import { MainContext } from '../redux/Provider';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  skip?: boolean;
  location: any;
  title: string;
  children?: any;
}
const Layout = ({ location, title, children, skip = false }: IProps) => {
  const [state, dispatch] = useContext(MainContext);
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  // if (location.pathname === rootPath) {
  //   header = (
  //     <h1
  //       style={{
  //         ...scale(1.5),
  //         marginBottom: rhythm(1.5),
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h1>
  //   );
  // } else {
  //   header = (
  //     <h3
  //       style={{
  //         fontFamily: `Montserrat, sans-serif`,
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h3>
  //   );
  // }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (state.scene) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'scroll';
    }
  }, [state.scene]);

  useEffect(() => {
    if (skip) dispatch({ type: 'SCENE', payload: false });
  }, [skip]);

  return (
    <div
      className={classnames(
        styles.wrapper,
        !state.scene
          ? styles.disActive
          : state.trigger
          ? styles.trigger
          : styles.active,
        skip ? styles.skip : null
      )}
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        maxWidth: rhythm(24),
      }}
    >
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
