import dotenv from 'dotenv';
import { env } from 'process';
import type { GatsbyConfig, PluginRef } from 'gatsby';
import path from 'path';

import { fileSystemNames } from './src/assets/constants/categories';
import { isProduction } from './scripts/env';
import algoliaQueries from './src/utils/algoliaQueries';
import { DeepRequiredAndNonNullable } from './typings/custom';

dotenv.config();

/**categories filesystem config */
const categoryFileConfig: PluginRef[] = fileSystemNames.map((name) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve(`content/${name}`),
    name,
  },
}));

const config: GatsbyConfig = {
  graphqlTypegen: !isProduction && !!process.env.CODEGEN,
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
        trackingId: env.TRACKING_ID,
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
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 890,
              wrapperStyle: `margin: 1rem auto;`,
            },
          },
        ],
        /*
         *  gatsby plugin with MDX2 does not support ESM for mdx plugins yet.
         *  So I have to use v1 of remark-gfm, and create my own rehype-meta-as-attributes
         *  https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#mdxoptions
         */
        mdxOptions: {
          remarkPlugins: [require('remark-gfm')],
          rehypePlugins: [
            require('rehype-slug'),
            require('./scripts/rehype-meta-as-attributes'),
          ],
        },
      },
    },
    'gatsby-plugin-cname',
    'gatsby-plugin-svgr',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#3390ff`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        pure: true,
      },
    },
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
    !!process.env.WEBPACK_BUNDLE_ANALYZER && {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 4396,
        production: true,
      },
    },
    'gatsby-plugin-netlify',
    isProduction && {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: env.GATSBY_ALGOLIA_APP_ID,
        apiKey: env.ALGOLIA_ADMIN_KEY,
        indexName: env.ALGOLIA_INDEX_NAME,
        queries: algoliaQueries,
        enablePartialUpdates: true,
        matchFields: ['slug'],
      },
    },
  ].filter((conf): conf is PluginRef => Boolean(conf)),
};

export default config;
