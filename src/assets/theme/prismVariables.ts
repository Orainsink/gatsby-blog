import { css } from 'styled-components';

export const lightPrismVariables = css`
  --prism-plain: #3d4451;
  --prism-plain-background: #f6f6f6;
  --prism-prolog: #000080;
  --prism-comment: #93a1a1;
  --prism-regex: #db4c69;
  --prism-property-access: var(--prism-property-access);
  --prism-keyword: #0077aa;
  --prism-attr-value: var(--prism-keyword);
  --prism-builtin: #569cd6;
  --prism-number: #990055;
  --prism-property: var(--prism-number);
  --prism-variable: #669900;
  --prism-string: var(--prism-variable);
  --prism-deleted: #ce9178;
  --prism-tag: var(--prism-number);
  --prism-punctuation: #999999;
  --prism-punctuation-markup: #808080;
  --prism-operator: #a67f59;
  --prism-function: #dd4a68;
  --prism-char: #d16969;
`;

export const darkPrismVariables = css`
  --prism-plain: #9cdcfe;
  --prism-plain-background: #1e1e1e;
  --prism-comment: #6a9955;
  --prism-keyword: var(--prism-builtin);
  --prism-attr-value: #ce9178;
  --prism-number: #b5cea8;
  --prism-property: #4ec9b0;
  --prism-variable: var(--prism-plain);
  --prism-string: var(--prism-attr-value);
  --prism-deleted: var(--prism-string);
  --prism-tag: var(--prism-property);
  --prism-punctuation: #d4d4d4;
  --prism-operator: var(--prism-punctuation);
  --prism-function: #dcdcaa;
`;
