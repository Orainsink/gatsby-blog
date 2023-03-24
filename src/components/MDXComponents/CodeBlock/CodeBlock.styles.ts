import { Button } from 'antd';
import styled, { CSSProperties, css } from 'styled-components';

export const labelSharedStyles = css`
  padding: 2px 12px 0px;
  background: var(--color-code-bg);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0px 0px;
  color: var(--color-text) !important;
  font-weight: var(--font-weight-lg);
`;

export const LabelsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 14px;
  transform: translateY(-98%);
  text-transform: uppercase;
`;

export const LanguageLabel = styled.div`
  ${labelSharedStyles}
  pointer-events: none;
  margin: 0 5px;
  height: 32px;
  line-height: 32px;
`;

export const CopyButton = styled(Button)`
  &.ant-btn {
    ${labelSharedStyles}
    transition: none;
    font-family: inherit;
  }
`;

export const HighlightContainer = styled.div`
  margin: var(--space-xxl) 0 var(--space-md) 0;
  position: relative;
`;

export const getPreStyle = (style: CSSProperties) => ({
  ...style,
  padding: 'var(--space-sm)',
  borderRadius: 'var(--border-radius-sm)',
  lineHeight: 1.5,
  overflow: 'auto',
  maxHeight: '40em',
});
