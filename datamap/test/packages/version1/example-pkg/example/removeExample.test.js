/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../../../src/app')

describe('v1/example-pkg/example/remove', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    app.models.sequelize.close()
    done()
  })

  test('registers in SODAS', () => {
    const removeExample = app.v1.service('example-pkg/example/remove')
    expect(removeExample).not.toBe(undefined)
  })

  test('removes example', async () => {
    const removeExample = app.v1.service('example-pkg/example/remove')
    const result = await removeExample.create({ id: 1 }, { user: { username: 'admin', roles: ['platform_admin'] } })
    expect(result).not.toBe(null)
  })
})
