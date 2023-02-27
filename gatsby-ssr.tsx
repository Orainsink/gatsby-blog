/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import { RecoilRoot } from 'recoil';
import type { GatsbySSR } from 'gatsby';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

const sheetByPathname = new Map();

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({
  element,
  pathname,
}) => {
  const sheet = new ServerStyleSheet();
  sheetByPathname.set(pathname, sheet);
  return (
    <StyleSheetManager sheet={sheet.instance}>
      <RecoilRoot>{element}</RecoilRoot>
    </StyleSheetManager>
  );

  // return <RecoilRoot>{element}</RecoilRoot>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  pathname,
  setPreBodyComponents,
  setHtmlAttributes,
}) => {
  const sheet = sheetByPathname.get(pathname);
  if (sheet) {
    setHeadComponents([sheet.getStyleElement()]);
    sheetByPathname.delete(pathname);
  }
  setHtmlAttributes({ lang: 'zh' });
};
