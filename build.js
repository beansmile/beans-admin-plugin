const babel = require('@babel/core')
const glob = require('glob')
const fs = require('fs-extra')
const _ = require('lodash')
const path = require('path')
const compiler = require('vue-template-compiler')
const config = require('./babel.config')

glob.sync('src/plugin/**/*.*').forEach(file => {
  const extname = path.extname(file)
  if (extname === '.js') {
    jsFileParse(file)
  } else if (extname === '.vue') {
    vueFileParse(file)
  } else {
    fs.copy(file, getOutputFile(file))
  }
})

async function jsFileParse(file) {
  const { code } = await babel.transformFileAsync(file, config)
  await fs.outputFile(getOutputFile(file), code)
}

async function vueFileParse(file) {
  const text = await fs.readFile(file, 'utf-8')
  const parsed = compiler.parseComponent(text)
  const { code } = await babel.transformAsync(
    _.get(parsed.script, 'content'),
    Object.assign({ filename: path.resolve(file) }, config),
  )
  const result =
    text.substring(0, parsed.script.start) + code + text.substring(parsed.script.end)
  fs.outputFile(getOutputFile(file), result)
}

function getOutputFile(file) {
  return file.replace(/^src\/plugin/, 'dist')
}
