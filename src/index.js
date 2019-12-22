const Subscription = require('./resolvers/Subscription')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Factura = require('./resolvers/Factura')

const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// 2
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Factura
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))


