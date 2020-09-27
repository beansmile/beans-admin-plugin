const fs = require('fs')
const path = require('path')
const process = require('process')
const Mustache = require('mustache')
const _ = require('lodash')
const pluralize = require('pluralize')
const BASE_DIR = 'template'
const TARGET_DIR = 'src/views'
const name = process.argv[2]

require('dotenv').config()

if (!name) throw new Error('You must provide the name of resource')

const className = _.upperFirst(_.camelCase(name))
const resourceName = pluralize.plural(_.snakeCase(name))
const modelName = _.upperFirst(pluralize.singular(_.camelCase(name)));

const fd = fs.openSync(path.join(BASE_DIR, 'page.mustache'), 'r+')
const content = fs.readFileSync(fd, 'utf8')
const result = Mustache.render(content, { className, resourceName, modelName }, {}, ['{[', ']}'])
fs.writeFileSync(path.join(TARGET_DIR, resourceName + '.vue'), result);
