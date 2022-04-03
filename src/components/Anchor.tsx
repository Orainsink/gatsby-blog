import { memo, useCallback } from 'react';
import { Anchor as AntAnchor, AnchorProps as AntAnchorProps } from 'antd';
interface AnchorProps extends AntAnchorProps {
  contents: any;
}
const Anchor = memo(({ contents, ...rest }: AnchorProps) => {
  /**
   * Recursion Links
   */
  const renderLinks = useCallback((content) => {
    if (!content.items) return null;

    function renderLink(items) {
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
