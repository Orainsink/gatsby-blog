import PropTypes from 'prop-types';

/**
 * svg animations always started after the page is fully loaded,
 * I tried many solutions, but only iframe work.
 */
const loadingIframe = `<iframe width="261px" height="261px" style="border:0;margin:0;padding:0;overflow:hidden;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI2MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBmaWxsPSJ0cmFuc3BhcmVudCIgc3Ryb2tlPSJ0cmFuc3BhcmVudCIgc3Ryb2tlLXdpZHRoPSIuMSIgc3Ryb2tlLW9wYWNpdHk9IjAiIGQ9Ik0uMjcxLS4yODhjLTkuMiAwLTE2LjY2IDMuMjg0LTE2LjY2IDcuMzM1czcuNDYgNy4zMzUgMTYuNjYgNy4zMzUgMTYuNjYxLTMuMjg0IDE2LjY2MS03LjMzNUMxNi45MzEgMi45OTcgOS40NzItLjI4OC4yNzItLjI4OHoiIGlkPSJhIi8+PGNpcmNsZSByPSIxIiBjeD0iMjAiIGN5PSIxNiIgZmlsbD0iI2ZmZiI+PGFuaW1hdGVNb3Rpb24gZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjxtcGF0aCB4bGluazpocmVmPSIjYSIvPjwvYW5pbWF0ZU1vdGlvbj48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSIjZmZmIi8+PC9zdmc+"></iframe>`;

export default function HTML(props) {
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
      </head>
      <body
        {...props.bodyAttributes}
        style={{ background: '#0a0a0a', overflowY: 'hidden' }}
      >
        <div
          id="___loader"
          dangerouslySetInnerHTML={{
            __html: loadingIframe,
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0a0a0a',
            transition: 'opacity 0.3s Linear',
            opacity: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 9999,
          }}
        />
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
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
