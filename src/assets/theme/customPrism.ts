// Converted automatically using ./tools/themeFromVsCode
/**
 * custom prism theme
 * Orainsink<ywt1250066597@gmail.com>
 * http://k88hudson.github.io/syntax-highlighting-theme-generator/www/
 */
import { PrismTheme } from 'prism-react-renderer';
var theme: PrismTheme = {
  plain: {
    color: '#3d4451',
    backgroundColor: '#f6f6f6',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#93A1A1',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#ee9900',
      },
    },
    {
      types: ['property-access'],
      style: {
        color: '#DB4C69',
      },
    },
    {
      types: ['keyword', 'attr-value', 'atrule', 'rule'],
      style: {
        color: '#0077aa',
      },
    },
    {
      types: ['builtin', 'changed'],
      style: {
        color: 'rgb(86, 156, 214)',
      },
    },
    {
      types: ['number', 'inserted', 'property', 'known-class-name'],
      style: {
        color: '#990055',
      },
    },
    // {
    //   types: ['constant'],
    //   style: {
    //     color: 'rgb(100, 102, 149)',
    //   },
    // },
    // {
    //   types: ['class-name'],
    //   style: {
    //     color: '#DD4A68',
    //   },
    // },
    {
      types: ['attr-name', 'variable', 'selector', 'string', 'template-string'],
      style: {
        color: '#669900',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(206, 145, 120)',
      },
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: '#990055',
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: '#990055',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#999999',
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#a67f59',
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080',
      },
    },
    {
      types: ['function', 'method'],
      style: {
        color: '#DD4A68',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)',
      },
    },
  ],
};

export default theme;
