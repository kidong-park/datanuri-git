/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')
const axios = require('axios')
const { Kafka } = require('kafkajs')

// const schedule = require('node-schedule')

/**
 * getJobList api
 */
module.exports.getJobList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Job List'),
        description: app.utils.docs.translate.default('Get Job List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Offset'),
            in: 'query',
            name: 'offset',
            type: 'integer',
            default: 0,
            required: false
          },
          {
            description: app.utils.docs.translate.property('Limit'),
            in: 'query',
            name: 'limit',
            type: 'integer',
            default: 10,
            required: false
          },
          {
            description: app.utils.docs.translate.property('Source Id'),
            in: 'query',
            name: 'sourceId',
            type: 'string',
            required: false
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                total: { type: 'integer', description: app.utils.docs.translate.property('Total') },
                jobs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      sourceId: { type: 'string', description: app.utils.docs.translate.property('Source Id') },
                      status: { type: 'string', description: app.utils.docs.translate.property('Status') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { offset, limit, sourceId } = params.query
      const query = {
        attributes: ['id', 'sourceId', 'status', 'issued'],
        order: [['issued', 'DESC']],
        limit: limit || 10,
        offset: offset || 0
      }
      if (sourceId) {
        query.where = { sourceId }
      }
      const { count, rows } = await app.models.harvestJob.findAndCountAll(query)
      return {
        total: count,
        jobs: rows
      }
    }
  }
}

/**
 * getJob api
 */
module.exports.getJob = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Job'),
        description: app.utils.docs.translate.default('Get Job'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'query',
            name: 'id',
            type: 'string',
            required: true
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful')
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { id } = params.query
      const query = {
        where: { id }
      }
      const result = await app.models.harvestJob.find(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20009 })
      }
      return result
    }
  }
}

/**
 * saveJob api
 */
module.exports.saveJob = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Job'),
        description: app.utils.docs.translate.default('Save Job'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Job'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                sourceId: {
                  description: app.utils.docs.translate.property('Source Id'),
                  type: 'string',
                  required: true
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { sourceId } = data
      const found = await app.models.harvestSource.findOne({ where: { id: sourceId } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20008 })
      }
      const foundJob = await app.models.harvestJob.findOne({ where: { sourceId, [app.models.sequelize.Op.or]: [ { status: 'Running' }, { status: 'Started' } ] } })
      if (foundJob) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20022 })
      }
      if (found.type === 'ckan' || found.type === 'dcat_rdf') {
        const { apikey, url } = app.get('harvester')
        const http = axios.create({ headers: { Authorization: `${apikey}` }, baseURL: url })
        const res = await http.post('harvest_job_create', { source_id: found.id, run: true })
        return { id: res.data.result.id }
      } else {
        const id = uuidv1()
        // const now = new Date(Date.now() + 5000)
        // schedule.scheduleJob(id, `${now.getSeconds()} ${now.getMinutes()} ${now.getHours()} * * *`, async () => {
        //   await app.v1.service('harvesting/job/object/save').create({ url: found.url, type: found.type })
        // })
        await app.models.harvestJob.create({
          id,
          sourceId,
          gatherStarted: new Date(),
          status: 'Started',
          issued: new Date()
        })
        const { kafka: kafkaConfig } = app.get('bigdata')
        const kafka = new Kafka({
          clientId: 'sodas',
          brokers: [kafkaConfig.url]
        })
        const producer = kafka.producer()
        const admin = kafka.admin()
        await admin.connect()
        try {
          await admin.createTopics({ topics: [{ topic: kafkaConfig.jobTopic }, { topic: id }] })
        } catch (error) {
          // show error
        }
        await admin.disconnect()
        await producer.connect()
        await producer.send({ topic: kafkaConfig.jobTopic, messages: [{ value: id }] })
        return { id }
      }
    }
  }
}

/**
 * updateJob api
 */
module.exports.updateJob = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Job'),
        description: app.utils.docs.translate.default('Update Job'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Job'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: app.utils.docs.translate.property('Id'),
                  type: 'string',
                  required: true
                },
                action: {
                  description: app.utils.docs.translate.property('Action (stop)'),
                  type: 'string',
                  required: true
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { id, action } = data
      const found = await app.models.harvestJob.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20009 })
      }
      const foundSource = await app.models.harvestSource.findOne({ where: { id: found.sourceId } })
      if (!foundSource) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20008 })
      }
      if (foundSource.type === 'ckan' || foundSource.type === 'dcat_rdf') {
        const { apikey, url } = app.get('harvester')
        const http = axios.create({ headers: { Authorization: `${apikey}` }, baseURL: url })
        await http.post('harvest_job_abort', { id: found.sourceId })
      } else {
        const updateData = {}
        if (found.status === 'Stopped' && action === 'start') {
          updateData.status = 'Started'
          updateData.gatherStarted = new Date()
          // const now = new Date(Date.now() + 5000)
          // schedule.scheduleJob(id, `${now.getSeconds()} ${now.getMinutes()} ${now.getHours()} * * *`, async () => {
          //   await app.v1.service('harvesting/job/object/save').create({ url: found.url, type: found.type })
          // })
          // start process
        } else if (action === 'stop') {
          if (found.status !== 'Finished') {
            updateData.status = 'Finished'
            updateData.gatherFinished = new Date()
            updateData.finished = new Date()
            // schedule.cancelJob(id)
            // stop process
            // TODO: delete kafka queue? + stop signal
            const { kafka: kafkaConfig } = app.get('bigdata')
            const kafka = new Kafka({
              clientId: 'sodas',
              brokers: [kafkaConfig.url]
            })
            const admin = kafka.admin()
            await admin.connect()
            try {
              await admin.deleteTopics({ topics: [id] })
            } catch (error) {
              // show error
            }
            await admin.disconnect()
          }
        }
        await app.models.harvestJob.update(updateData, {
          where: { id },
          returning: true
        })
      }
      return { result: 'success' }
    }
  }
}

/**
 * removeJob api
 */
module.exports.removeJob = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Job'),
        description: app.utils.docs.translate.default('Remove Job'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Job'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: app.utils.docs.translate.property('Id'),
                  type: 'string',
                  required: true
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { id } = data
      const found = await app.models.harvestJob.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20009 })
      }
      if (found.status !== 'Finished' && found.status !== 'Error') {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20022 })
      }
      await app.models.harvestJob.destroy({ where: { id } })
      return { result: 'success' }
    }
  }
}

/**
 * saveObjectJob api
 */
module.exports.saveObjectJob = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Object Job'),
        description: app.utils.docs.translate.default('Save Object Job'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Job'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                url: {
                  description: app.utils.docs.translate.property('url'),
                  type: 'string',
                  required: true
                },
                type: {
                  description: app.utils.docs.translate.property('Type (ckan/rdf)'),
                  type: 'string',
                  required: false
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { url, type } = data
      if (type === 'rdf') {
        const rdf = require('rdflib')
        const path = require('path')
        const store = rdf.graph()
        const fetcher = new rdf.Fetcher(store, 5000)
        fetcher.nowOrWhenFetched(url, async () => {
          const datasetType = rdf.sym('http://www.w3.org/ns/dcat#Dataset')
          const datasetNodes = store.each(undefined, undefined, datasetType)
          for (const datasetNode of datasetNodes) {
            const statements = store.statementsMatching(datasetNode, undefined, undefined)
            const data = { id: uuidv1(), ownerId: 'default_org', type: 'dataset', landingPageUrl: datasetNode.value, approvalState: 'accept' } // TODO: id
            statements.forEach(statement => {
              if (statement.object.value !== 'http://www.w3.org/ns/dcat#Dataset') {
                const key = path.basename(statement.predicate.value).split('#').pop()
                data[key] = statement.object.value
              }
            })
            const found = await app.models.resource.findOne({ where: { landingPageUrl: datasetNode.value } })
            if (found) {
              data.id = found.id
            }
            await app.models.resource.upsert(data)
          }
        })
      }
      return { result: 'success' }
    }
  }
}
