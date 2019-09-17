/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const camelCase = require('camelcase')
const camelcaseKeys = require('camelcase-keys')

/**
 * Convert hypen/underscore to camelCase
 * @example
 *   {'foo-bar': true} ==> {fooBar: true}
 *   'foo-bar' ==> fooBar
 *   [{'foo-bar': true}, {'bar-foo': false}] ==> [{fooBar: true}, {barFoo: false}]
 * @param {any} value - string/object
 * @returns {any} camelCase form result
 */
module.exports.toCamelCase = (value) => {
  if ((typeof value) === 'string') {
    return camelCase(value)
  } else if ((typeof value) === 'object') {
    return camelcaseKeys(value, { deep: true })
  }
  return value
}
