// #!/usr/bin/env node
/**
 * generate markdown file by template
 */
const fs = require('fs');
const moment = require('moment');
const exec = require('child_process').exec;
const os = require('os');
const _path = require('path');
const inquirer = require('inquirer');

const { CATEGORY_NAMES } = require('../src/assets/constants/categories');

const QUESTIONS = [
  {
    type: 'confirm',
    name: 'isFolder',
    message: 'is a folder？(default is Yes)',
    default: true,
  },
  {
    type: 'list',
    name: 'categories',
    message: 'Choose a category:',
    choices: CATEGORY_NAMES,
  },
  {
    type: 'input',
    name: 'description',
    message: 'input your description:',
  },
];
class NewPost {
  constructor({
    isFolder = true,
    categories = '',
    description = ' ',
    url = '',
    index = 0,
  }) {
    this.isFolder = isFolder;
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
    if (this.isFolder) {
      fs.mkdirSync(`./content/${categories}/${title}`);
      this.path = `./content/${categories}/${title}/${title}.mdx`;
    } else {
      this.path = `./content/${categories}/${title}.mdx`;
    }
  }
  getStrByConfig() {
    let result = '';
    result = Object.keys(this.config)
      .map((field) => {
        const v = this.config[field];
        return v ? `${field}: ${v}\n` : '';
      })
      .filter(Boolean)
      .join('');
    return result;
  }
  getOutput() {
    const result = this.getStrByConfig();
    return '---\n' + result + 'tags: []\n' + '---';
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
