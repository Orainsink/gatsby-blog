import { memo, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { useCustomTitle } from '../hooks';
import { GetSeoDataQuery } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';

interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
}
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery  hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
const SEO = ({
  description,
  lang = 'CHS',
  meta,
  title,
}: Props): ReactElement => {
  const { site } = useStaticQuery<DeepRequiredAndNonNullable<GetSeoDataQuery>>(
    graphql`
      query getSeoData {
        site(graphqlTypegen: { ne: true }) {
          siteMetadata {
            title
            description
            social {
              github
            }
          }
        }
      }
    `
  );

  const metadata = site.siteMetadata;
  const metaDescription = description || metadata.description;
  useCustomTitle(title);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defer={false}
      title={title}
      titleTemplate={`%s | ${metadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: metadata.social.github,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  );
};

export default memo(SEO);
