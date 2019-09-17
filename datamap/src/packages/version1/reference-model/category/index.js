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
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/list', api.getTaxonomyList)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/get', api.getTaxonomy)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/save', api.saveTaxonomy)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/update', api.updateTaxonomy)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/remove', api.removeTaxonomy)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/current-path/get', api.getTaxonomyCurrentPath)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/sub-path/get', api.getTaxonomySubPath)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/first-level/get', api.getTaxonomyFirstLevel)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/concept-schema/get', api.getConceptSchema)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/concept-schema/save', api.saveConceptSchema)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/category/lastId', api.getTaxonomyLastId, true)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('reference-model/taxonomy/category/list').hooks(validator.getTaxonomyList)
  app.v1.service('reference-model/taxonomy/category/get').hooks(validator.getTaxonomy)
  app.v1.service('reference-model/taxonomy/category/save').hooks(validator.saveTaxonomy)
  app.v1.service('reference-model/taxonomy/category/update').hooks(validator.updateTaxonomy)
  app.v1.service('reference-model/taxonomy/category/remove').hooks(validator.removeTaxonomy)
  app.v1.service('reference-model/taxonomy/category/current-path/get').hooks(validator.getTaxonomyCurrentPath)
  app.v1.service('reference-model/taxonomy/category/sub-path/get').hooks(validator.getTaxonomySubPath)
  app.v1.service('reference-model/taxonomy/category/first-level/get').hooks(validator.getTaxonomyFirstLevel)
  app.v1.service('reference-model/taxonomy/category/concept-schema/get').hooks(validator.getConceptSchema)
  app.v1.service('reference-model/taxonomy/category/concept-schema/save').hooks(validator.saveConceptSchema)
}
