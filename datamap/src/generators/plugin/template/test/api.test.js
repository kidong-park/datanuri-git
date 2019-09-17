/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const app = require('../../../src/app')

describe('{{ name }}', () => {
  beforeAll((done) => {
    done()
  })

  afterAll((done) => {
    done()
  })

  test('registers in SODAS', () => {
    const api = app.v1.service('/{{ name }}/api')
    expect(api).not.toBe(undefined)
  })
})
