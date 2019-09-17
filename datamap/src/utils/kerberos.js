/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const krb5 = require('krb5')

/**
 * Get Spengo Token
 * @param {any} authentication - Kerberos Authentication
 * @param {any} service - Kerberos Service
 * @returns {any} Spengo Token
 */
module.exports.getSpengoToken = async (authentication, service) => {
  await krb5.kinit(authentication)
  const spengo = await krb5.spnego({ service_fqdn: service })
  return spengo
}

/**
 * Get Authentication Token
 * @param {any} authentication - Kerberos Authentication
 * @param {any} service - Kerberos Service
 * @returns {any} Authentication Token
 */
module.exports.getToken = async (authentication, service) => {
  // TODO: use delegation token
  try {
    await krb5.kdestroy()
  } catch (error) {
    // error
  }
  return this.getSpengoToken(authentication, service)
}
