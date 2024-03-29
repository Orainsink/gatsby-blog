import { generatePath } from '../../utils/generatePath';
import { Link } from 'gatsby';
import { LeadUl } from '../Templates.styles';

interface PreAndNextProps {
  previous: any;
  next: any;
}

/**
 * @deprecated
 * Not in use because I don't have time to design it
 */
export const PreAndNext = ({ previous, next }: PreAndNextProps) => {
  return (
    <nav>
      <LeadUl>
        <li style={{ textAlign: 'left' }}>
          {previous && (
            <Link
              to={generatePath(
                previous.frontmatter.categories,
                previous.frontmatter.title
              )}
              rel="prev"
            >
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li style={{ textAlign: 'right' }}>
          {next && (
            <Link
              to={generatePath(
                next.frontmatter.categories,
                next.frontmatter.title
              )}
              rel="next"
            >
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </LeadUl>
    </nav>
  );
};
