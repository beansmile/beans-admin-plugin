/* eslint-disable pathname/match-name */
import SparkMD5 from 'spark-md5'
import request from './request';
import { randomFileName } from './random';
import Vue from 'vue';

const fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

// https://github.com/rails/rails/blob/master/activestorage/app/javascript/activestorage/file_checksum.js
class FileChecksum {
  static create(file, callback) {
    const instance = new FileChecksum(file)
    instance.create(callback)
  }

  constructor(file) {
    this.file = file
    this.chunkSize = 2097152 // 2MB
    this.chunkCount = Math.ceil(this.file.size / this.chunkSize)
    this.chunkIndex = 0
  }

  create(callback) {
    this.callback = callback
    this.md5Buffer = new SparkMD5.ArrayBuffer
    this.fileReader = new FileReader
    this.fileReader.addEventListener('load', event => this.fileReaderDidLoad(event))
    this.fileReader.addEventListener('error', event => this.fileReaderDidError(event))
    this.readNextChunk()
  }

  fileReaderDidLoad(event) {
    this.md5Buffer.append(event.target.result)

    if (!this.readNextChunk()) {
      const binaryDigest = this.md5Buffer.end(true)
      const base64digest = btoa(binaryDigest)
      this.callback(null, base64digest)
    }
  }

  fileReaderDidError() {
    this.callback(`Error reading ${this.file.name}`)
  }

  readNextChunk() {
    if (this.chunkIndex < this.chunkCount || (this.chunkIndex === 0 && this.chunkCount === 0)) {
      const start = this.chunkIndex * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      const bytes = fileSlice.call(this.file, start, end)
      this.fileReader.readAsArrayBuffer(bytes)
      this.chunkIndex++
      return true
    } else {
      return false
    }
  }
}

function createChecksum(file) {
  return new Promise((resolve, reject) => {
    FileChecksum.create(file, (error, checksum) => {
      if (error) {
        return reject(error);
      }
      resolve(checksum);
    });
  });
}

export async function uploadFile(file, tags) {
  const body = {
    filename: file.name || randomFileName(''),
    content_type: file.type || 'application/octet-stream',
    byte_size: file.size,
    checksum: await createChecksum(file),
    tags
  }
  const uploadConfig = Vue.vadminConfig.upload || {};
  const { directUploadURL, customUpload } = uploadConfig;

  if (customUpload) {
    return customUpload(file, body);
  }

  const result = await request.post(directUploadURL, body);
  // 1小时超时
  await request.put(result.direct_upload.url, file.slice(), { headers: result.direct_upload.headers, timeout: 1 * 60 * 60 * 1000 });

  return {
    ...result,
    url: result.direct_upload.url,
    blob_url: result.direct_upload.blob_url
  };
}

export function checkFileSize(file, size) {
  return file.size <= size * 1024 * 1024;
}

export function isImageFile(file) {
  return file.type.startsWith('image');
}

export function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  })
}

export async function imageFileNeedCrop(file, cropperObj) {
  const { width, height } = await getImageInfo(file);
  // 可接受的误差
  const avaliableOffset = 2;
  const offset = Math.floor(Math.abs(cropperObj.width / cropperObj.height - width / height) * 100);
  return offset > avaliableOffset;
}
