// Converted automatically using ./tools/themeFromVsCode
/**
 * custom prism theme
 * Orainsink<ywt1250066597@gmail.com>
 * http://k88hudson.github.io/syntax-highlighting-theme-generator/www/
 */
import { PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
  plain: {
    color: 'var(--prism-plain)',
    backgroundColor: 'var(--prism-plain-background)',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'var(--prism-prolog)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'var(--prism-comment)',
      },
    },
    {
      types: ['regex'],
      style: {
        color: 'var(--prism-regex)',
      },
    },
    {
      types: ['property-access'],
      style: {
        color: 'var(--prism-property-access)',
      },
    },
    {
      types: ['keyword', 'interpolation-punctuation'],
      style: {
        color: 'var(--prism-keyword)',
      },
    },
    {
      types: ['attr-value', 'atrule', 'rule', 'template-punctuation'],
      style: {
        color: 'var(--prism-attr-value)',
      },
    },
    {
      types: ['builtin', 'changed'],
      style: {
        color: 'var(--prism-builtin)',
      },
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'var(--prism-number)',
      },
    },
    {
      types: ['property', 'known-class-name'],
      style: {
        color: 'var(--prism-property)',
      },
    },
    {
      types: ['attr-name', 'variable', 'selector'],
      style: {
        color: 'var(--prism-variable)',
      },
    },
    {
      types: ['string', 'template-string'],
      style: {
        color: 'var(--prism-string)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'var(--prism-deleted)',
      },
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'var(--prism-tag)',
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'var(--prism-tag)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'var(--prism-punctuation)',
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'var(--prism-operator)',
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: 'var(--prism-punctuation-markup)',
      },
    },
    {
      types: ['function', 'method'],
      style: {
        color: 'var(--prism-function)',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'var(--prism-char)',
      },
    },
  ],
};
