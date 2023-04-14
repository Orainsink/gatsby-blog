/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import { RecoilRoot } from 'recoil';
import type { GatsbySSR } from 'gatsby';
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { renderToPipeableStream } from 'react-dom/server';
import { WritableAsPromise } from './scripts/writable-as-promise';
import { doExtraStyle } from './scripts/genAntdCss';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: 'zh' });
};

export const replaceRenderer: GatsbySSR['replaceRenderer'] = async ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const cache = createCache();
  const writableStream = new WritableAsPromise();
  const { pipe } = renderToPipeableStream(
    <StyleProvider cache={cache}>{bodyComponent}</StyleProvider>,
    {
      onAllReady() {
        pipe(writableStream);
      },
      onShellError(error) {
        writableStream.destroy(error as Error);
      },
    }
  );

  const bodyHTML = await (writableStream as unknown as Promise<string>);
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
