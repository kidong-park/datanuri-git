/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const nodePlop = require('node-plop')
const path = require('path')

/**
 * Plugin generation
 */
async function pluginGenerate () {
  const plop = nodePlop()
  plop.setGenerator('sodas-plugin', {
    description: 'Plop generator for Sodas plugin',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Plugin name:',
        validate: (value) => {
          // TODO: plugin name must start with prefix sodas-plugin
          if ((/.+/).test(value)) { return true }
          return 'Project name is required'
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Plugin description:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Plugin author:'
      },
      {
        type: 'input',
        name: 'path',
        message: 'Plugin path:',
        default: path.join(__dirname, '../../../plugins')
      }
    ],
    actions: (data) => {
      const actions = []
      actions.push({
        type: 'addMany',
        base: path.join(__dirname, 'template'),
        destination: path.join(data.path, data.name),
        templateFiles: path.join(__dirname, 'template/**')
      })
      return actions
    }
  })
  const plugin = plop.getGenerator('sodas-plugin')
  const inputPlugin = await plugin.runPrompts()
  await plugin.runActions(inputPlugin)
}

if (process.argv[1].indexOf('generators/plugin') !== -1) {
  pluginGenerate()
}
