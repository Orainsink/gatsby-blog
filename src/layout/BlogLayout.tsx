import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';

import { rhythm, scale } from '../utils/typography';
interface IProps {
  location: any;
  title: string;
  children?: any;
}
/**文章页Layout */
const Layout = ({ location, title, children }: IProps) => {
  const { scene, trigger } = useSelector((state) => state);
  const dispatch = useDispatch();

  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  useEffect(() => {
    dispatch({ type: 'SCENE', payload: false });

    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'scroll';
  }, []);

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

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
