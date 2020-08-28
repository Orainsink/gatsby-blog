import React from 'react';
import PropTypes from 'prop-types';
import Loading from './components/Loading';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="loader"
          id="___loader"
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
        >
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="260px"
            height="260px"
            viewBox="0 0 40 40"
            xmlSpace="preserve"
          >
            <path
              id=""
              opacity="0"
              fill="transparent"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z"
            />
            <path
              id="orbit"
              d="m20.201,15.91701c-9.20089,0 -16.6606,3.28421 -16.6606,7.335c0,4.05128 7.4597,7.335 16.6606,7.335s16.6606,-3.28372 16.6606,-7.335c-0.00111,-4.05079 -7.4597,-7.335 -16.6606,-7.335z"
              strokeOpacity="0"
              strokeWidth=".1"
              stroke="transparent"
              fill="transparent"
            />
            <circle id="mun" r="1" fill="#fff">
              <animateMotion id="animation" dur="2s" repeatCount="indefinite">
                <mpath xlinkHref="#orbit"></mpath>
              </animateMotion>
            </circle>
            <circle cx="20" cy="20" r="5" fill="#fff"></circle>
          </svg>
        </div>
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
