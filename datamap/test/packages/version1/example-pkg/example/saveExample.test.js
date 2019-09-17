/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../../../src/app')

describe('v1/example-pkg/example/save', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    app.models.sequelize.close()
    done()
  })

  test('registers in SODAS', () => {
    const saveExample = app.v1.service('example-pkg/example/save')
    expect(saveExample).not.toBe(undefined)
  })

  test('saves example', async () => {
    const saveExample = app.v1.service('example-pkg/example/save')
    const data = { email: 'email@email.com', firstname: 'firstname', lastname: 'lastname' }
    const { id } = await saveExample.create(data, { user: { username: 'admin', roles: ['platform_admin'] } })
    const stored = await app.models.example.findOne({ where: { id } })
    expect(stored).toMatchObject({ id, username: 'admin', ...data })
  })
})
