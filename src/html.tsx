import { DarkModeScript } from './components/HtmlTemplate';

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
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
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
