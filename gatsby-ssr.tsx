/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import { RecoilRoot } from 'recoil';
import type { GatsbySSR } from 'gatsby';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: 'CHS' });
};
