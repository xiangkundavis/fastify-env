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
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    data: process.env, // optional, default: process.env,
    dotenv: true
 }
fastify
  .register(fastifyEnv, options)
  .ready((err) => {
    if (err) console.error(err)
    console.log(fastify.config,'after ready fastify.config') // undefined
    console.log(process.env.port,'after ready  process.env.port') // undefined
    // console.log(fastify.config) // or fastify[options.confKey]
    // output: { PORT: 3000 }
  })  
console.log(fastify.config,'fastify.config') // undefined
console.log(process.env.port,'process.env.port') // undefined

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
/**
 * Run the server!
 */
const start = async () => {
    try {
      console.log('config', fastify.config) // config undefined
      await fastify.listen({ port: 3000 })
      console.log('after', fastify.config)  // after { PORT: '3000' }

    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()
// Run the server!
// fastify.listen({ port: 3000 }, function (err, address) {
//   if (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// })