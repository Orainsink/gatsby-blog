// #!/usr/bin/env node
/**
 * generate markdown file from template
 * # sh
 * # yarn new ['name' or '/name']
 * => '/name' means folder, use it when you need imgs or other assets
 * => '/name##category' add category
 */
import { categories } from '../src/assets/config/categories';
const fs = require('fs');
const moment = require('moment');
const exec = require('child_process').exec;
const os = require('os');
const _path = require('path');

const str = process.argv[2];

const isFolder = str.startsWith('/');
const category = str.split('##')[1] || 'tech';
const title = str.replace('/', '').replace(/##.+/, '');
const date = moment().format('YYYY-MM-DD HH:mm:ss');
let path = '';

// content/category
try {
  if (categories.indexOf(category) === -1) {
    throw new Error('wrong category');
  }

  let output = `---
  title: ${title}
  date: ${date}
  description:
  tags: []
  categories: ${category}
  ${category === 'leetcode' ? 'url' : ''}
  ${category === 'leetcode' ? 'index:' : ''}
  ---
  `;

  if (isFolder) {
    fs.mkdirSync(`./content/${category}/${title}`);
    path = `./content/${category}/${title}/${title}.mdx`;
  } else {
    path = `./content/${category}/${title}.mdx`;
  }
  fs.writeFileSync(path, output);

  if (os.platform() === 'win32') {
    const openPath = _path.normalize(__dirname.slice(0, -7) + path.slice(1));
    exec(`explorer.exe /select,"${openPath}"`);
  }
  console.table([{ title, date, category, isFolder }]);
} catch (error) {
  console.error(error);
}
