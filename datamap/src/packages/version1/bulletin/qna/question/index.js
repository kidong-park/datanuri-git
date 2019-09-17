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
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/question/save', api.saveQuestion)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/question/update', api.updateQuestion)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/question/remove', api.removeQuestion)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/question/get', api.getQuestion)
  app.utils.services.register(app, app.v1, 'bulletin-board/qna/question/list', api.getQuestionList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('bulletin-board/qna/question/save').hooks(validator.saveQuestion)
  app.v1.service('bulletin-board/qna/question/update').hooks(validator.updateQuestion)
  app.v1.service('bulletin-board/qna/question/remove').hooks(validator.removeQuestion)
  app.v1.service('bulletin-board/qna/question/get').hooks(validator.getQuestion)
  app.v1.service('bulletin-board/qna/question/list').hooks(validator.getQuestionList)
}
