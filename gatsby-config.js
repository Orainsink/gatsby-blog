module.exports = {
  siteMetadata: {
    title: `Orainsink's blog`,
    author: {
      name: `Orainsink`,
      summary: `空空如也`,
    },
    description: `Blog XD`,
    siteUrl: `https://foolishrobot.xyz/gatsby-blog/`,
    social: {
      github: `https://github.com/Orainsink`,
    },
  },
  pathPrefix: '/gatsby-blog',
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
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `200`,
            },
          },
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
        trackingId: `UA-173159064-1`,
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
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
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
          'link-color': '#2b2b2b', // 链接色
          'link-hover-color': '#327ce4', // 链接hover颜色
          'main-background': '#efefef',
          // 'btn-primary-bg': '#fff',
          'font-size-base': '16px', // 主字号
          'box-shadow-base':
            '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
          'tooltip-bg': '#FFF',
          'tooltip-color': '#3d4451',
          'transparent-color': '#efefef',
          // @heading-color: rgba(0, 0, 0, 0.85); // 标题色
          'text-color': '#3d4451', // 主文本色
          'text-color-secondary': '#666666', // 次文本色
          // @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
          'border-radius-base': '4px', // 组件/浮层圆角
          // @border-color-base: #d9d9d9; // 边框色
        },
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-css-modules`,
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
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#3390ff`,
        showSpinner: true,
      },
    },
  ],
};
