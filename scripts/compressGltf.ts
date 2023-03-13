import gltfPipeline from 'gltf-pipeline';
import fsExtra from 'fs-extra';
import path from 'path';
import fs from 'fs';

import processGltf = gltfPipeline.processGltf;
const pipelineOptions = {
  dracoOptions: {
    compressionLevel: 10,
  },
};

/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./project/src', '.html') ==> ['./project/src/a.html','./project/src/build/index.html']
 * @param  {String} startPath    Path relative to this file or other file which requires this files
 * @param  {String} filter       Extension name, e.g: '.html'
 * @return {Array}               Result files with path string in an array
 */
const findFilesInDir = (
  startPath: string,
  filter: string
): string[] | undefined => {
  let results: string[] = [];

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter) as string[]);
    } else if (filename.indexOf(filter) >= 0) {
      console.log('🔎 found: ', filename);
      results.push(filename);
    }
  }

  return results;
};

/**
 * compress gltf files
 * @param {String} path
 * @param {Number} index
 * @returns void
 */
const compressGltf = (path: string, index: number) => {
  if (!path.match(/.gltf/g)) {
    return console.log('path wrong: ' + path);
  }
  const gltf = fsExtra.readJsonSync(path);

  processGltf(gltf, pipelineOptions).then((results: any) => {
    fsExtra.writeJsonSync(path.slice(0, -2) + 'b', results.gltf);
  });
};

const gltfList = findFilesInDir('content', '.gltf');
gltfList?.forEach(compressGltf);
