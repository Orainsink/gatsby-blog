import React from 'react';
import PropTypes from 'prop-types';

const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="260" viewBox="0 0 40 40"><path id="a" d="M20.201 15.917c-9.2 0-16.66 3.284-16.66 7.335S11 30.587 20.2 30.587s16.66-3.284 16.66-7.335c0-4.05-7.46-7.335-16.66-7.335z" stroke-opacity="0" stroke-width=".1" stroke="transparent" fill="transparent"/><circle r="1" fill="#fff"><animateMotion dur="2s"><mpath xlink:href="#a"/></animateMotion></circle><circle cx="20" cy="20" r="5" fill="#fff"/></svg>`;

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} style={{ overflowY: 'hidden' }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body
        {...props.bodyAttributes}
        style={{ background: '#0a0a0a', overflowY: 'hidden' }}
      >
        {props.preBodyComponents}
        <div
          id="___loader"
          dangerouslySetInnerHTML={{ __html: loadingSvg }}
          style={{
            position: 'absolute',
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
