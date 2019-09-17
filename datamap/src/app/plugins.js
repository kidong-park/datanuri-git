/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const path = require('path')

/**
 * Plugin Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  const plugins = app.get('plugins')
  for (const plugin of plugins) {
    try {
      const { api } = require(path.join(app.get('pluginsDir'), plugin))
      if (api) {
        app.configure(api)
      }
    } catch (error) {
      app.error(error)
    }
  }
}

/**
 * Plugin validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  const plugins = app.get('plugins')
  for (const plugin of plugins) {
    try {
      const { validator } = require(path.join(app.get('pluginsDir'), plugin))
      if (validator) {
        app.configure(validator)
      }
    } catch (error) {
      app.error(error)
    }
  }
}

/**
 * Plugin hook register
 * @param {object} app - Feather's app
 */
module.exports.hook = (app) => {
  const plugins = app.get('plugins')
  for (const plugin of plugins) {
    try {
      const { hook } = require(path.join(app.get('pluginsDir'), plugin))
      if (hook) {
        app.configure(hook)
      }
    } catch (error) {
      app.error(error)
    }
  }
}
