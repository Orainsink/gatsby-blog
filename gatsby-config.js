require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Orainsink's blog`,
    author: {
      name: `Orainsink`,
      summary: `空空如也`,
    },
    description: `Orainsink 的博客, 前端, 随笔, 其他技术笔记`,
    siteUrl: `https://foolishrobot.xyz/`,
    social: {
      github: `https://github.com/Orainsink`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/about`,
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: false,
              fromHeading: 1,
              toHeading: 6,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-responsive-iframe`,
          // {
          //   resolve: `gatsby-remark-autolink-headers`,
          //   options: {
          //     offsetY: `200`,
          //   },
          // },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: require('./src/utils/algolia-queries'),
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
      options: {
        useHydrate: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Orainsink's Blog`,
        short_name: `Orainsink`,
        start_url: `/`,
        background_color: `#efefef`,
        theme_color: `#3d4451`,
        display: `antd`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        cssLoaderOptions: {
          camelCase: false,
          strictMath: true,
        },
        modifyVars: {
          'primary-color': '#3390ff',
          'link-color': '#2b2b2b',
          'link-hover-color': '#327ce4',
          'main-background': '#efefef',
          // 'btn-primary-bg': '#fff',
          'font-size-base': '16px',
          'box-shadow-base':
            '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
          'tooltip-bg': '#FFF',
          'tooltip-color': '#3d4451',
          'transparent-color': '#efefef',
          // @heading-color: rgba(0, 0, 0, 0.85);
          'text-color': '#3d4451',
          'text-color-secondary': '#666666',
          // @disabled-color: rgba(0, 0, 0, 0.25);
          'border-radius-base': '4px',
          // @border-color-base: #d9d9d9;
        },
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-css-modules`,
    'gatsby-plugin-cname',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/redux/store',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        cleanupOnClient: true,
        windowKey: '__PRELOADED_STATE__',
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#3390ff`,
        showSpinner: true,
      },
    },
  ],
};
