import { ReactComponent as CanIUseSvg } from '../img/canIUse.svg';
import { ReactComponent as ColorSvg } from '../img/color.svg';
import { ReactComponent as ReactUseSvg } from '../img/hook.svg';
import { ReactComponent as ShadowSvg } from '../img/shadow.svg';
import { ReactComponent as RegxSvg } from '../img/regx.svg';
import { ReactComponent as IconfontSvg } from '../img/icon.svg';
import { ReactComponent as LoadingIoSvg } from '../img/loadingIo.svg';
import { ReactComponent as SvgSvg } from '../img/svg.svg';
import { ReactComponent as HslSvg } from '../img/colorWheel.svg';
import { ReactComponent as EmojiSvg } from '../img/horseFace.svg';
import { ReactComponent as CubicBezierSvg } from '../img/bezier.svg';
import { ReactComponent as GridSvg } from '../img/grid.svg';
import { ComponentType, SVGProps } from 'react';

interface Tool {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  url: string;
}
const TOOLS: Tool[] = [
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
    name: 'box-shadow',
    icon: ShadowSvg,
    url: 'https://html-css-js.com/css/generator/box-shadow',
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
export default TOOLS;
