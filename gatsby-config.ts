import dotenv from 'dotenv';
import { env } from 'process';
import type { GatsbyConfig, PluginRef } from 'gatsby';
import path from 'path';

import { CATEGORY_NAMES } from './src/assets/constants/categories';
import isProduction from './scripts/env';
import algoliaQueries from './src/utils/algolia-queries';
import { DeepRequiredAndNonNullable } from './typings/custom';
import {
  REMARK_LINK_CLASS,
  REMARK_LINK_OFFSET,
} from './src/assets/constants/common';

dotenv.config();

/**categories filesystem config */
const categoryFileConfig: PluginRef[] = CATEGORY_NAMES.map((name) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve(`content/${name}`),
    name,
  },
}));

const config: GatsbyConfig = {
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
  },
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
        path: path.resolve('content/about'),
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve('content/assets'),
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
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: path.resolve(`./src/layout/GlobalLayout.tsx`),
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
            serialize: ({
              query: { site, allMdx },
            }: {
              query: DeepRequiredAndNonNullable<
                Pick<Queries.Query, 'site' | 'allMdx'>
              >;
            }) => {
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
                  sort: {frontmatter: {date: DESC}},
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
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    'gatsby-plugin-mdx-embed',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-responsive-iframe',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 890,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: REMARK_LINK_OFFSET,
              className: REMARK_LINK_CLASS,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h2`, `h3`, `h4`],
            },
          },
        ],
      },
    },
    'gatsby-plugin-cname',
    'gatsby-plugin-svgr',
    // 'gatsby-plugin-swc',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#3390ff`,
        showSpinner: true,
      },
    },
    `gatsby-plugin-styled-components`,
    isProduction && {
      resolve: '@sentry/gatsby',
      options: {
        dsn: env.GATSBY_SENTRY_DSN,
        environment: env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].includes(env.NODE_ENV || 'stage'))(),
        sampleRate: 0.7,
        tracesSampleRate: 0.8,
      },
    },
    !!env.WEBPACK_BUNDLE_ANALYZER && {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 4396,
        production: true,
      },
    },
    isProduction && {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: algoliaQueries,
        enablePartialUpdates: true,
        matchFields: ['slug'],
      },
    },
  ].filter((conf): conf is PluginRef => Boolean(conf)),
};

export default config;
