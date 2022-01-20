const fs = require('fs');
const moment = require('moment');
const exec = require('child_process').exec;
const os = require('os');
const _path = require('path');
const inquirer = require('inquirer');

const QUESTIONS = [
  {
    type: 'list',
    name: 'color',
    message: '今天绿了吗？',
    choices: [
      {
        name: '红了 🟥',
        value: 'red',
        short: 'red',
      },
      {
        name: '绿了 🟩',
        value: 'green',
        short: 'green',
      },
    ],
  },
  {
    type: 'list',
    name: 'range',
    message: '具体点: ',
    choices: ({ color }) => {
      return color === 'red'
        ? ['小肉', '大肉', '开香槟']
        : ['小面', '大面', '亏麻了'];
    },
  },
];
const today = moment().format('YYYY.MM.DD');
const pathSuffix =
  'content/essay/癌股实战经验长期总结/癌股实战经验长期总结.mdx';
const path = _path.normalize(__dirname.slice(0, -7) + pathSuffix);

const openFile = (curPath) => {
  if (os.platform() === 'win32') {
    exec(`explorer.exe /select,"${curPath}"`);
  } else {
    exec(`open ${curPath}`);
  }
};

const addNewDiary = (result, color, range) => {
  const _color = color === 'red' ? '🟥' : '🟩';
  const title = `### ${today} ${range} ${_color}`;
  return result.replace(
    /\#\# 交易记录\n/,
    '## 交易记录\n' + '\n' + title + '\n'
  );
};

const editDiary = ({ color, range }) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const result = addNewDiary(data, color, range);

    fs.writeFile(path, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });

  openFile(path);
};

inquirer.prompt(QUESTIONS).then(editDiary).catch(console.error);
