import fs from 'fs';
import path from 'path';
import { extractStyle } from '@ant-design/cssinjs';
import { createHash } from 'crypto';
import type Entity from '@ant-design/cssinjs/lib/Cache';

/*
 * https://ant.design/docs/react/customize-theme#server-side-render-ssr
 * This script is for getting the antd styles string which can be used to be injected into SSR renderer.
 * Strongly inspired by this pr: https://github.com/ant-design/create-next-app-antd/pull/6/files
 *
 * Notice: gatsby build will report errors because they use fs to track the file changes to support incremental build. Unsafe builtin method was used, future builds will need to rebuild all pages.
 * See details: https://github.com/gatsbyjs/gatsby/pull/29560
 */

const styleTagReg = /<style[^>]*>([\s\S]*?)<\/style>/g;

export type DoExtraStyleOptions = {
  cache: Entity;
  dir?: string;
  baseFileName?: string;
};
export function doExtraStyle({
  cache,
  dir = 'antd-css',
  baseFileName = 'antd.min',
}: DoExtraStyleOptions) {
  const baseDir = path.resolve(__dirname, '../../../public');
  const outputCssPath = path.join(baseDir, dir);

  if (!fs.existsSync(outputCssPath)) {
    fs.mkdirSync(outputCssPath, { recursive: true });
  }

  const cssText = extractStyle(cache);
  const css = cssText.replace(styleTagReg, '$1');

  const md5 = createHash('md5');
  const hash = md5.update(css).digest('hex');
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`;
  const fullpath = path.join(outputCssPath, fileName);

  const res = `${dir}/${fileName}`;

  if (fs.existsSync(fullpath)) return res;

  fs.writeFileSync(fullpath, css);

  return res;
}
