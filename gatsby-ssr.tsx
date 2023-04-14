/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import { RecoilRoot } from 'recoil';
import type { GatsbySSR } from 'gatsby';
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';
import { doExtraStyle } from './scripts/genAntdCss';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: 'zh' });
};

export const replaceRenderer: GatsbySSR['replaceRenderer'] = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const cache = createCache();
  const bodyHTML = renderToString(
    <StyleProvider cache={cache}>{bodyComponent}</StyleProvider>
  );
  replaceBodyHTMLString(bodyHTML);

  const fileName = doExtraStyle({
    cache,
  });
  setHeadComponents(
    [fileName && <link rel="stylesheet" href={`/${fileName}`} />].filter(
      Boolean
    )
  );
};
