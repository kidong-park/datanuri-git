/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../../../src/app')

describe('v1/example-pkg/example/get', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    app.models.sequelize.close()
    done()
  })

  test('registers in SODAS', () => {
    const getExample = app.v1.service('example-pkg/example/get')
    expect(getExample).not.toBe(undefined)
  })

  test('shows detailed example', async () => {
    const getExample = app.v1.service('example-pkg/example/get')
    const result = await getExample.find({ query: { id: 2 } })
    expect(result).not.toBe(null)
  })
})
