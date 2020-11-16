const path = require('path');
const OSS = require('ali-oss');
const fs = require('fs-extra');
const glob = require('glob');
const async = require('async');
const _ = require('lodash');
const dotenv = require('dotenv');
const defaultConfig = dotenv.config().parsed;
const envConfig = dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
const moment = require('moment');

const config = {
  ...defaultConfig,
  ...envConfig
}

const client = new OSS({
  accessKeyId: config.OSS_ACCESS_KEY_ID,
  accessKeySecret: config.OSS_ACCESS_KEY_SECRET,
  bucket: config.OSS_BUCKET,
  endpoint: config.OSS_ENDPOINT,
  timeout: '300s'
});

const getFiles = (pattern) => {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  })
}

const clearOldVersionFiles = async () => {
  const { objects } = await client.list({
    prefix: config.OSS_ASSETS_NAMESPACE,
  });
  const objectsGroupedByName = _.groupBy(objects, item => {
    const nameArr = path.basename(item.name).split('.');
    return [nameArr[0], nameArr[nameArr.length - 1]].join('.');
  });
  // 保留3个版本
  const saveVersion = 3;
  const deleteObjectsNames = _.flatten(
    _.filter(objectsGroupedByName, list => list.length > saveVersion)
      .map(list => list.sort((a, b) => moment(a.lastModified).diff(moment(b.lastModified))))
      .map(list => list.slice(0, list.length - saveVersion).map(item => item.name))
  );
  if (deleteObjectsNames.length) {
    console.log('将从OSS删除旧版文件', deleteObjectsNames.join(','));
    await client.deleteMulti(deleteObjectsNames);
  }
}

const run = async () => {
  const filesArr = await Promise.all([
    getFiles(`${path.resolve('dist')}/*.!(html)`),
    getFiles(`${path.resolve('dist')}/!(ckeditor)/*`)
  ]);
  const files = _.flattenDeep(filesArr);
  const fileList = files.map(item => ({
    filePath: item,
    fileName: path.join(config.OSS_ASSETS_NAMESPACE, path.relative(path.resolve('dist'), item))
  }));
  console.log('上传到OSS...');
  // 部署机器带宽太低，并发1
  await async.eachLimit(fileList, 1, async (item) => {
    console.log(`正在上传${item.fileName}...`);
    await client.put(item.fileName, item.filePath);
  });
  console.log('上传到OSS完成');
  console.log('清理dist目录...');
  await Promise.all(files.map(item => fs.remove(item)));
  console.log('清理dist目录完成');
  console.log('清理OSS旧版本文件...');
  await clearOldVersionFiles();
  console.log('清理OSS旧版本文件完成');
}

run()
  .catch(err => {
    console.error(err);
    process.abort();
  });
