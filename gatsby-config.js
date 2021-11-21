require('dotenv').config();
const modifyVars = require('./scripts/less-vars');
const { CATEGORY_NAMES } = require('./src/assets/constants/categories');
const isProduction = require('./scripts/env');

/**categories filesystem config */
const categoryFileConfig = CATEGORY_NAMES.map((name) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/content/${name}`,
    name,
  },
}));

module.exports = {
  siteMetadata: {
    title: `Orainsink's Blog`,
    author: {
      name: `Orainsink`,
      summary: `做嘛做嘛, 都可以做, 小问题, 不要慌`,
    },
    description: `Orainsink 的博客, 前端, 随笔, 其他技术笔记`,
    siteUrl: `https://blog.foolishrobot.xyz/`,
    social: {
      github: `https://github.com/Orainsink`,
    },
  },
  plugins: [
    ...categoryFileConfig,
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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    isProduction && {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.TRACKING_ID,
      },
    },
    isProduction && {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: require('./src/utils/algolia-queries'),
        enablePartialUpdates: true,
        matchFields: ['slug'],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/GlobalLayout.tsx`),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      body
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Orainsink's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Orainsink's Blog`,
        short_name: `Orainsink`,
        start_url: `/`,
        background_color: `#0a0a0a`,
        theme_color: `#3d4451`,
        display: `standalone`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    // offline plugin makes loading strange
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/pages/*`],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          javascriptEnabled: true,
          // strictMath: true,
          cssLoaderOptions: {
            camelCase: false,
          },
          modifyVars,
          postCssPlugins: [require('autoprefixer'), require('cssnano')].filter(
            Boolean
          ),
        },
        postCssPlugins: [require('autoprefixer'), require('cssnano')],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 890,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-typescript`,
    'gatsby-plugin-cname',
    'gatsby-plugin-dark-mode',
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
    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
      options: {
        useHydrate: true,
      },
    },
    isProduction && {
      resolve: '@sentry/gatsby',
      options: {
        release: 'blog',
        dsn: process.env.GATSBY_SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
        sampleRate: 0.7,
        tracesSampleRate: 0.8,
      },
    },
  ].filter(Boolean),
};
