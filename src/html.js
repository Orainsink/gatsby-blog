import React from 'react';
import PropTypes from 'prop-types';

const loadingSvg = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="260px" height="260px" viewBox="0 0 40 40"><path fill="transparent" stroke="transparent" stroke-width="0.1" stroke-opacity="0"  d="m0.27143,-0.2878c-9.20089,0 -16.6606,3.28421 -16.6606,7.335c0,4.05128 7.4597,7.335 16.6606,7.335s16.6606,-3.28372 16.6606,-7.335c-0.00111,-4.05079 -7.4597,-7.335 -16.6606,-7.335z" id="orbit"/><circle id="mun" r="1" cx="20" cy="16" fill="#fff"><animateMotion id="animation" dur="2s" repeatCount="indefinite"><mpath xlink:href="#orbit"></mpath></animateMotion></circle><circle cx="20" cy="20" r="5" fill="#fff"></circle></svg>`;

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
        {props.preBodyComponents}
        <div
          id="___loader"
          dangerouslySetInnerHTML={{
            __html: loadingSvg,
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
