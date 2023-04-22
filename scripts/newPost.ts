// #!/usr/bin/env node
/**
 * generate markdown file by template
 */
import fs from 'fs';
import moment from 'moment';
import childProcess from 'child_process';
import os from 'os';
import _path from 'path';
import inquirer from 'inquirer';
import { mapObjIndexed } from 'ramda';

import { fileSystemNames } from '../src/assets/constants/categories';

const exec = childProcess.exec;

const QUESTIONS = [
  {
    type: 'confirm',
    name: 'isFolder',
    message: 'is a folder? (default is Yes)',
    default: true,
  },
  {
    type: 'list',
    name: 'categories',
    message: 'Choose a category:',
    choices: fileSystemNames,
  },
  {
    type: 'input',
    name: 'description',
    message: 'input your description:',
  },
  {
    type: 'confirm',
    name: 'isTodo',
    message: 'create in todo folder? (default is false)',
  },
];

interface Config {
  categories: string;
  description: string;
  date: string;
  title: string;
  url: string;
  index: number;
}
class NewPost {
  isFolder: boolean;
  isTodo: boolean;
  path: string;
  config: Config;

  constructor({
    isFolder = true,
    categories = '',
    description = ' ',
    isTodo = false,
    url = '',
    index = 0,
  }) {
    this.isFolder = isFolder;
    this.isTodo = isTodo;
    this.path = '';
    this.config = {
      categories,
      description,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      title: process.argv[2],
      url,
      index,
    };

    this.newPipe();
  }
  newPipe() {
    try {
      this.getPath();
      this.writeFile();
      this.openFolder();
    } catch (error) {
      console.error(error);
    }
  }
  getPath() {
    const { categories, title } = this.config;
    const folderName = this.isTodo ? 'todo' : categories;
    if (this.isFolder) {
      fs.mkdirSync(`./content/${folderName}/${title}`);
      this.path = `./content/${folderName}/${title}/${title}.mdx`;
    } else {
      this.path = `./content/${folderName}/${title}.mdx`;
    }
  }
  getStrByConfig() {
    const result: string[] = [];

    mapObjIndexed((v, field) => {
      result.push(v ? `${field}: ${v}\n` : '');
    }, this.config);

    return result.filter(Boolean).join('');
  }
  getOutput() {
    const result = this.getStrByConfig();
    return '---\n' + result + 'tags: []\n---';
  }
  writeFile() {
    const { categories, title, date } = this.config;
    const output = this.getOutput();
    fs.writeFileSync(this.path, output);

    console.table([
      {
        title: title,
        date: date,
        categories: categories,
        isFolder: this.isFolder,
      },
    ]);
  }
  openFolder() {
    const openPath = _path.normalize(
      __dirname.slice(0, -7) + this.path.slice(1)
    );
    try {
      if (os.platform() === 'win32') {
        exec(`explorer.exe /select,"${openPath}"`);
      } else {
        exec(`open ${openPath}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

inquirer
  .prompt(QUESTIONS)
  .then((answers) => new NewPost(answers))
  .catch(console.error);
