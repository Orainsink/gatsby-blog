import { generatePath } from '../../utils/generatePath';
import { Link } from 'gatsby';
import { LeadUl } from '../Templates.styles';

interface PreAndNextProps {
  previous: any;
  next: any;
}
export const PreAndNext = ({ previous, next }: PreAndNextProps) => {
  return (
    <nav>
      <LeadUl>
        <li style={{ textAlign: 'left' }}>
          {previous && (
            <Link
              to={generatePath(
                previous.frontmatter.categories,
                previous.fields.slug
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
              to={generatePath(next.frontmatter.categories, next.fields.slug)}
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
