import Prism from 'prism-react-renderer/prism';
// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-powershell');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-less');
require('prismjs/plugins/line-highlight/prism-line-highlight.min');
require('prismjs/plugins/line-highlight/prism-line-highlight.css');

export default Prism;
