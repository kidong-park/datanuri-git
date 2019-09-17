/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../../../src/app')

describe('v1/example-pkg/example/list', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    app.models.sequelize.close()
    done()
  })

  test('registers in SODAS', () => {
    const getExampleList = app.v1.service('example-pkg/example/list')
    expect(getExampleList).not.toBe(undefined)
  })

  test('shows example list', async () => {
    const getExampleList = app.v1.service('example-pkg/example/list')
    const result = await getExampleList.find({ query: { limit: 10, offset: 0 } })
    expect(result).not.toBe(null)
  })
})
