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
  app.utils.services.register(app, app.v1, 'bulletin-board/notice/save', api.saveNotice)
  app.utils.services.register(app, app.v1, 'bulletin-board/notice/update', api.updateNotice)
  app.utils.services.register(app, app.v1, 'bulletin-board/notice/remove', api.removeNotice)
  app.utils.services.register(app, app.v1, 'bulletin-board/notice/get', api.getNotice)
  app.utils.services.register(app, app.v1, 'bulletin-board/notice/list', api.getNoticeList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('bulletin-board/notice/save').hooks(validator.saveNotice)
  app.v1.service('bulletin-board/notice/update').hooks(validator.updateNotice)
  app.v1.service('bulletin-board/notice/remove').hooks(validator.removeNotice)
  app.v1.service('bulletin-board/notice/get').hooks(validator.getNotice)
  app.v1.service('bulletin-board/notice/list').hooks(validator.getNoticeList)
}
