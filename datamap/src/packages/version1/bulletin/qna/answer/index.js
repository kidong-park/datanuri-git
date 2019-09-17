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
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/answer/save', api.saveAnswer)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/answer/update', api.updateAnswer)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/answer/remove', api.removeAnswer)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/answer/get', api.getAnswer)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('bulletin-board/qna/answer/save').hooks(validator.saveAnswer)
  app.v1.service('bulletin-board/qna/answer/update').hooks(validator.updateAnswer)
  app.v1.service('bulletin-board/qna/answer/remove').hooks(validator.removeAnswer)
  app.v1.service('bulletin-board/qna/answer/get').hooks(validator.getAnswer)
}
