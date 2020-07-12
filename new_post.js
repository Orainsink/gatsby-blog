// #!/usr/bin/env node
/**
 * generate markdown file from template
 * # sh
 * # yarn new ['name' or '/name']
 * => '/name' means folder, use it when you need imgs or other assets
 */

let fs = require('fs');
let moment = require('moment');

// if is folder
let folder = process.argv[2].startsWith('/');

let title = folder ? process.argv[2].slice(1) : process.argv[2],
  date = moment().format('YYYY-MM-DD h:mm:ss');

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
  fs.writeFileSync(`./content/blog/${title}/${title}.md`, output);
} else {
  fs.writeFileSync(`./content/blog/${title}.md`, output);
}
console.table([{ title, date, folder }]);
