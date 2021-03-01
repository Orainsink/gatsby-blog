require('dotenv').config();
const modifyVars = require('./scripts/less-vars');
const { categories } = require('./src/assets/config/categories');

/**categories filesystem config */
const categoryFileConfig = categories.map((item) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/content/${item}`,
    name: item,
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
                  custom_elements: [{ 'content:encoded': edge.node.html }],
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
                      html
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
        background_color: `#0a0a0a`,
        theme_color: `#3d4451`,
        display: `standalone`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    // offline plugin makes loading strange
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
        lessOptions: {
          javascriptEnabled: true,
          cssLoaderOptions: {
            camelCase: false,
            strictMath: true,
          },
          modifyVars,
        },
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
              maxWidth: 1035,
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
    `gatsby-plugin-react-css-modules`,
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
      resolve: '@sentry/gatsby',
      options: {
        release: process.env.RELEASE_VERSION,
        dsn: process.env.GATSBY_SENTRY_DSN,
        sampleRate: 0.7,
        tracesSampleRate: 0.8,
      },
    },
  ],
};
