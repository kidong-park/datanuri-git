/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const ipa = require('node-freeipa')

/**
 * saveUser api
 */
module.exports.saveUser = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id, firstName, lastName, email, password } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      const ipaRe = await ipa.user_add([], {
        uid: id,
        givenname: firstName,
        sn: lastName,
        cn: firstName,
        mail: email,
        userpassword: password,
        setattr: 'krbpasswordexpiration=20990101010101Z'
      })
      if (ipaRe && ipaRe.error) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20024 })
      }
      return { result: 'success' }
    }
  }
}

/**
 * updateUser api
 */
module.exports.updateUser = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id, firstName, lastName } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.user_mod([], {
        uid: id,
        givenname: firstName,
        sn: lastName,
        cn: firstName
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeUser api
 */
module.exports.removeUser = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.user_del([], { uid: id })
      return { result: 'success' }
    }
  }
}

/**
 * resetUserPassword api
 */
module.exports.resetUserPassword = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      const user = await ipa.user_mod([], {
        uid: id,
        random: true
      })
      await ipa.user_mod([], {
        uid: id,
        setattr: 'krbpasswordexpiration=20990101010101Z'
      })
      return { password: user.randompassword }
    }
  }
}

/**
 * changeUserPassword api
 */
module.exports.changeUserPassword = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id, currentPassword, newPassword } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      const re = await ipa.passwd([], {
        principal: id,
        password: newPassword,
        current_password: currentPassword
      })
      if (re && re.error) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10018 })
      }
      await ipa.user_mod([], {
        uid: id,
        setattr: 'krbpasswordexpiration=20990101010101Z'
      })
      return { result: 'success' }
    }
  }
}

/**
 * saveOrganization api
 */
module.exports.saveOrganization = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      const ipaRe = await ipa.group_add([], { cn: id })
      if (ipaRe && ipaRe.error) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10027 })
      }
      return { result: 'success' }
    }
  }
}

/**
 * removeOrganization api
 */
module.exports.removeOrganization = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.group_del([], { cn: id })
      return { result: 'success' }
    }
  }
}

/**
 * saveOrganizationMember api
 */
module.exports.saveOrganizationMember = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { userId, organizationId } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.group_add_member([], { cn: organizationId, user: userId })
      return { result: 'success' }
    }
  }
}

/**
 * removeOrganizationMember api
 */
module.exports.removeOrganizationMember = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { userId, organizationId } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.group_remove_member([], { cn: organizationId, user: userId })
      return { result: 'success' }
    }
  }
}

/**
 * saveOrganizationMemberRole api
 */
module.exports.saveOrganizationMemberRole = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id, role } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.role_add_member([], { cn: role, user: id })
      return { result: 'success' }
    }
  }
}

/**
 * removeOrganizationMemberRole api
 */
module.exports.removeOrganizationMemberRole = (app) => {
  return {
    // POST method
    async create (data, params) {
      const { id, role } = data
      const { freeipa } = app.get('authentication')
      ipa.configure(freeipa)
      await ipa.role_remove_member([], { cn: role, user: id })
      return { result: 'success' }
    }
  }
}
