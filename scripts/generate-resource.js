const fs = require('fs')
const path = require('path')
const process = require('process')
const Mustache = require('mustache')
const _ = require('lodash')
const pluralize = require('pluralize')
const name = process.argv[2]

if (!name) throw new Error('You must provide the name of resource')

const className = _.upperFirst(_.camelCase(name))
const resourceName = pluralize.plural(_.snakeCase(name))
const modelName = _.upperFirst(pluralize.singular(_.camelCase(name)));

const fd = fs.openSync(path.join(__dirname, '../template/page.mustache'), 'r+')
const content = fs.readFileSync(fd, 'utf8')
const result = Mustache.render(content, { className, resourceName, modelName }, {}, ['{[', ']}'])
fs.writeFileSync(path.resolve('src/views', resourceName + '.vue'), result);
