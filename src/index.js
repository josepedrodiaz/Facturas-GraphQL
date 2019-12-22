const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// 2
const resolvers = {

  Query: {
    info: () => 'Esta es mi API de Facturas',
    feed: ( root, args, context, info ) => {
      return context.prisma.facturas()
    },
    getFacturaByIndex: (_, { key }) => facturas[key],
    getFacturaByPeriodo: function (_, { periodo }) {
      let result;
      for (let i = 0, len = facturas.length; i < len; i++) {
        if (facturas[i]["periodo"] === periodo) {
          result = facturas[i];
          break;
        }
      }
      return result;
    },
  },

  Mutation: {
    post: (root, args, context)=> {
      return context.prisma.createFactura({
        periodo: args.periodo,
        monto: args.monto,
      })
    },

    put: (parent, args) => {
      let facturaActualizadaIndex
      for (let i = 0, len = facturas.length; i < len; i++) {
        if (facturas[i]["id"] === args.id) {
          facturas[i].periodo = args.periodo
          facturas[i].monto = args.monto
          facturaActualizadaIndex = i
          break
        }
      }
      return facturas[facturaActualizadaIndex]

    },

      delete: (parent, args) => {
        let elementosBorrados = false
        for (let i = 0, len = facturas.length; i < len; i++) {
          if (facturas[i]["periodo"] === args.periodo) {
            facturas.splice(i, 1);
            elementosBorrados = true
          }
        }
        if (elementosBorrados) {
          return "Se han borrado todas las facturas correspondientes al período " + args.periodo
        }else{
          return "No se encuentran facturas correspondientes al período " + args.periodo
        }
      }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))


