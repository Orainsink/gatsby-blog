// #!/usr/bin/env node
/**
 * generate markdown file from template
 * # sh
 * # yarn new ['name' or '/name']
 * => '/name' means folder, use it when you need imgs or other assets
 * => '/name##category' add category
 */
let fs = require('fs');
let moment = require('moment');
let exec = require('child_process').exec;
let os = require('os');
let _path = require('path');

let str = process.argv[2];

let isFolder = str.startsWith('/');
let category = str.split('##')[1] || 'tech';
let title = str.replace('/', '').replace(/##.+/, '');
let date = moment().format('YYYY-MM-DD HH:mm:ss');
let path = '';

// content/category
const categories = ['tech', 'leetcode', 'snippet', 'essay'];
if (categories.indexOf(category) === -1) {
  return console.error(new Error("wrong category -_-''"));
}

let output = `---
title: ${title}
date: ${date}
description:
url:
index:
tags: []
categories: ${category}
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
  let openPath = _path.normalize(__dirname.slice(0, -7) + path.slice(1));
  exec(`explorer.exe /select,"${openPath}"`);
}
console.table([{ title, date, category, isFolder }]);
