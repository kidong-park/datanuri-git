/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const api = require('./api')
const validator = require('./validator')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.utils.services.registerForFile(app, app.v1, 'harvesting/datamap/catalog/get', api.getCatalog)
  app.utils.services.registerForFile(app, app.v1, 'harvesting/datamap/dataset/get', api.getDataset)
  app.utils.services.registerForFile(app, app.v1, 'harvesting/datamap/dataservice/get', api.getDataService)
  app.utils.services.registerForFile(app, app.v1, 'harvesting/datamap/source/get', api.getSource)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('harvesting/datamap/catalog/get').hooks(validator.getCatalog)
  app.v1.service('harvesting/datamap/dataset/get').hooks(validator.getDataset)
  app.v1.service('harvesting/datamap/dataservice/get').hooks(validator.getDataService)
  app.v1.service('harvesting/datamap/source/get').hooks(validator.getSource)
}
