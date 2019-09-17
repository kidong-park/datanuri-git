/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../../../src/app')

describe('v1/example-pkg/example/update', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    app.models.sequelize.close()
    done()
  })

  test('registers in SODAS', () => {
    const updateExample = app.v1.service('example-pkg/example/update')
    expect(updateExample).not.toBe(undefined)
  })

  test('updates example', async () => {
    const updateExample = app.v1.service('example-pkg/example/update')
    const result = await updateExample.create({ id: 1, email: 'new_email@email.com', firstname: 'new_firstname', lastname: 'new_lastname' }, { user: { username: 'admin', roles: ['platform_admin'] } })
    expect(result).not.toBe(null)
  })
})
