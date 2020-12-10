const path = require('path');
const OSS = require('ali-oss');
const fs = require('fs-extra');
const glob = require('glob');
const async = require('async');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

const config = require('minimist')(process.argv.slice(2));

const client = new OSS({
  accessKeyId: config.OSS_ACCESS_KEY_ID,
  accessKeySecret: config.OSS_ACCESS_KEY_SECRET,
  bucket: config.OSS_BUCKET,
  endpoint: config.OSS_ENDPOINT,
  timeout: '600s'
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
    'max-keys': 1000
  });
  const objectsGroupedByName = _.groupBy(objects, item => {
    const nameArr = item.name.split('.');
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

const generateChecksum = async (filePath) => {
  const data = await fs.readFile(filePath);
  return crypto.createHash('md5').update(data).digest('hex');
}

const uploadFile = async (fileName, filePath) => {
  const checksum = await generateChecksum(filePath);
  const upload = async () => {
    console.log(`正在上传文件: ${filePath}`);
    await client.put(fileName, filePath, { meta: { checksum } });
  };
  return client.head(fileName)
    .then(({ meta }) => {
      if (_.get(meta, 'checksum') !== checksum) {
        return upload();
      }
    })
    .catch(e => {
      if (e.status === 404) {
        return upload();
      }
      throw e;
    });
}

const run = async () => {
  const allFiles = await getFiles(`${path.resolve('dist')}/**/*.!(html)`);
  const files = allFiles.filter(item => fs.lstatSync(item).isFile());

  const fileList = files.map(item => ({
    filePath: item,
    fileName: path.join(config.OSS_ASSETS_NAMESPACE, path.relative(path.resolve('dist'), item))
  }));

  console.log('上传到OSS...');
  await async.eachLimit(fileList, 10, async (item) => {
    await uploadFile(item.fileName, item.filePath);
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
