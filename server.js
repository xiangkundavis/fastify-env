const fastify = require('fastify')({
  logger: true
})
const fastifyEnv = require('@fastify/env')
require("dotenv").config();

const schema = {
    type: 'object',
    required: [ 'PORT' ],
    properties: {
      PORT: {
        type: 'string',
        default: 3000
      }
    }
}
const options = {
    confKey: 'configfromenv', // optional, default: 'config'
    schema: schema,
    data: process.env, // optional, default: process.env,
    dotenv: true
 }
fastify
  .register(fastifyEnv, options)
  .ready((err) => {
    if (err) console.error(err)
    console.log(fastify.configfromenv,'after ready fastify.config') // { PORT: '4000' } 
  })  
console.log(fastify.configfromenv,'fastify.config') // undefined
console.log(process.env.PORT,'process.env.port') // 4000

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
/**
 * Run the server!
 */
const start = async () => {
    try {
      console.log('config', fastify.configfromenv) // config undefined
      await fastify.listen({ port: 3000 })
      console.log('after', fastify.configfromenv)  // after { PORT: '4000' }
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()
