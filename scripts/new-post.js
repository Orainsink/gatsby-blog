// #!/usr/bin/env node
/**
 * generate markdown file from template
 * # sh
 * # yarn new ['name' or '/name']
 * => '/name' means folder, use it when you need imgs or other assets
 * => '/name##category' add category
 */
const { CATEGORY_MAP } = require('../src/assets/constants/categories');
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

function writeFile() {
  let output =
    category === 'leetcode'
      ? `---
title: ${title}
date: ${date}
description:
tags: []
categories: ${category}
url: ''
index: ''
---`
      : `---
title: ${title}
date: ${date}
description:
tags: []
categories: ${category}
---`;

  if (isFolder) {
    fs.mkdirSync(`./content/${category}/${title}`);
    path = `./content/${category}/${title}/${title}.mdx`;
  } else {
    path = `./content/${category}/${title}.mdx`;
  }
  fs.writeFileSync(path, output);
}

function openFolder() {
  const openPath = _path.normalize(__dirname.slice(0, -7) + path.slice(1));
  try {
    if (os.platform() === 'win32') {
      exec(`explorer.exe /select,"${openPath}"`);
    } else if (os.platform() === 'darwin') {
      exec(`open ${openPath}`);
    }
  } catch (err) {
    console.log(err);
  }
}

// content/category
try {
  if (CATEGORY_MAP.has(category)) {
    throw new Error('wrong category');
  }

  writeFile();
  openFolder();

  console.table([{ title, date, category, isFolder }]);
} catch (error) {
  console.error(error);
}
