/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const axios = require('axios')
const app = require('../src/app')

describe('SODAS', () => {
  beforeAll((done) => {
    this.server = app.listen(app.get('port'))
    this.server.once('listening', () => done())
  })

  afterAll((done) => {
    this.server.close(done)
  })

  test('starts and shows the index page', async () => {
    const result = (await axios.get(`http://${app.get('host')}:${app.get('port')}`)).data
    expect(result).not.toBe(null)
  })
})
