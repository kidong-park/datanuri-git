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
  app.utils.services.register(app, app.v1, 'bulletin-board/faq/list', api.getFaqList)
  app.utils.services.register(app, app.v1, 'bulletin-board/faq/get', api.getFaq)
  app.utils.services.register(app, app.v1, 'bulletin-board/faq/save', api.saveFaq)
  app.utils.services.register(app, app.v1, 'bulletin-board/faq/update', api.updateFaq)
  app.utils.services.register(app, app.v1, 'bulletin-board/faq/remove', api.removeFaq)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('bulletin-board/faq/list').hooks(validator.getFaqList)
  app.v1.service('bulletin-board/faq/get').hooks(validator.getFaq)
  app.v1.service('bulletin-board/faq/save').hooks(validator.saveFaq)
  app.v1.service('bulletin-board/faq/update').hooks(validator.updateFaq)
  app.v1.service('bulletin-board/faq/remove').hooks(validator.removeFaq)
}
