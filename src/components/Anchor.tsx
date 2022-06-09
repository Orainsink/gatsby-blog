import { memo, useCallback, ReactElement } from 'react';
import { Anchor as AntAnchor, AnchorProps as AntAnchorProps } from 'antd';

interface LinkItem {
  url: string;
  title: string;
  items: LinkItem[];
}
interface AnchorProps extends AntAnchorProps {
  contents: {
    items: LinkItem[];
  };
}
const Anchor = memo(({ contents, ...rest }: AnchorProps): ReactElement => {
  /**
   * Recursion Links
   */
  const renderLinks = useCallback((content: { items?: LinkItem[] }) => {
    if (!content.items) return null;

    function renderLink(items: LinkItem[]) {
      return items.map((item) => (
        <AntAnchor.Link href={item.url} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </AntAnchor.Link>
      ));
    }
    return renderLink(content.items);
  }, []);
  return <AntAnchor {...rest}>{renderLinks(contents)}</AntAnchor>;
});

export default Anchor;
