import { antdStyleText } from './assets/theme/antdThemeCache';
import { DarkModeScript, HtmlLoading } from './components/HtmlTemplate';

interface HTMLProps {
  htmlAttributes: Record<string, any>;
  headComponents: any[];
  bodyAttributes: Record<string, any>;
  preBodyComponents: any[];
  body: string;
  postBodyComponents: any[];
}

const HTML = (props: HTMLProps) => {
  return (
    <html {...props.htmlAttributes} style={{ overflowY: 'hidden' }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
        />
        {props.headComponents}
        {antdStyleText}
      </head>
      <body {...props.bodyAttributes}>
        <HtmlLoading />
        <DarkModeScript />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};
export default HTML;
