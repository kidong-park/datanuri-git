/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const notice = require('./notice')
const faq = require('./faq')
const qna = require('./qna')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(notice.api)
  app.configure(faq.api)
  app.configure(qna.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(notice.validator)
  app.configure(faq.validator)
  app.configure(qna.validator)
}
