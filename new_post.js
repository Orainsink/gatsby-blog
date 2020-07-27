// #!/usr/bin/env node
/**
 * generate markdown file from template
 * # sh
 * # yarn new ['name' or '/name']
 * => '/name' means folder, use it when you need imgs or other assets
 */

let fs = require('fs');
let moment = require('moment');
let exec = require('child_process').exec;
let os = require('os');

// if is folder
let folder = process.argv[2].startsWith('/');

let title = folder ? process.argv[2].slice(1) : process.argv[2],
  date = moment().format('YYYY-MM-DD h:mm:ss'),
  path;

let output = `---
title: ${title}
date: ${date}
description:
tags: []
---
# ${title}
`;
if (folder) {
  fs.mkdirSync(`./content/blog/${title}`);
  path = `./content/blog/${title}/${title}.md`;
} else {
  path = `./content/blog/${title}.md`;
}
fs.writeFileSync(path, output);

if (os.platform() === 'win32') {
  exec(
    `explorer.exe /select,"${__dirname}${path.slice(1).split('/').join('\\')}"`
  );
}

console.table([{ title, date, folder }]);