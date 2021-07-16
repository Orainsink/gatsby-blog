const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const processGltf = gltfPipeline.processGltf;
const path = require('path');
const fs = require('fs');

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
function findFilesInDir(startPath, filter) {
  let results = [];

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter)); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      console.log('🔎 found: ', filename);
      results.push(filename);
    }
  }

  return results;
}
/**
 * compress gltf files
 * @param {String} path
 * @param {Number} index
 * @returns void
 */
function compressGltf(path, index) {
  if (!path.match(/.gltf/g)) {
    return console.log('path wrong: ' + path);
  }
  const gltf = fsExtra.readJsonSync(path);

  processGltf(gltf, pipelineOptions).then((results) => {
    fsExtra.writeJsonSync(path.slice(0, -2) + 'b', results.gltf);
  });
}

const gltfList = findFilesInDir('content', '.gltf');
gltfList.forEach(compressGltf);
