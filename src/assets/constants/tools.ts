import CanIUseSvg from '../img/canIUse.svg';
import ColorSvg from '../img/color.svg';
import ReactUseSvg from '../img/hook.svg';
import ShadowSvg from '../img/shadow.svg';
import RegxSvg from '../img/regx.svg';
import IconfontSvg from '../img/icon.svg';
import LoadingIoSvg from '../img/loadingIo.svg';
import SvgSvg from '../img/svg.svg';
import HslSvg from '../img/colorWheel.svg';
import EmojiSvg from '../img/horseFace.svg';
import CubicBezierSvg from '../img/bezier.svg';
import GridSvg from '../img/grid.svg';

interface Tool {
  name: string;
  icon: string;
  url: string;
}
export const TOOLS: Tool[] = [
  {
    name: 'can-I-use',
    icon: CanIUseSvg,
    url: 'https://caniuse.com',
  },
  {
    name: 'grid',
    icon: GridSvg,
    url: 'https://grid.layoutit.com',
  },
  {
    name: 'color',
    icon: ColorSvg,
    url: 'https://color.adobe.com/zh/create/color-wheel',
  },
  {
    name: 'react-use',
    icon: ReactUseSvg,
    url: 'https://github.com/zenghongtu/react-use-chinese/blob/master/README.md',
  },
  {
    name: 'git-alias',
    icon: ShadowSvg,
    url: 'https://www.hschne.at/git-aliases',
  },
  {
    name: 'regexr',
    icon: RegxSvg,
    url: 'https://regexr.com',
  },
  {
    name: 'iconfont',
    icon: IconfontSvg,
    url: 'https://www.iconfont.cn',
  },
  {
    name: 'loading.io',
    icon: LoadingIoSvg,
    url: 'https://loading.io',
  },
  {
    name: 'svg-generator',
    icon: SvgSvg,
    url: 'https://editor.method.ac',
  },
  {
    name: 'hsl',
    icon: HslSvg,
    url: 'https://hslpicker.com',
  },
  {
    name: 'cubic-bezier',
    icon: CubicBezierSvg,
    url: 'https://cubic-bezier.com',
  },
  {
    name: 'emoji',
    icon: EmojiSvg,
    url: 'https://emojipedia.org',
  },
];
