const { GraphQLServer } = require('graphql-yoga')


let facturas = [{
  id: 'factura-0',
  periodo: '01/2020',
  monto: 1920.32
}]

let idCount = facturas.length

// 2
const resolvers = {

  Query: {
    info: () => 'Esta es mi API de Facturas',
    feed: () => facturas,
    getFacturaByIndex: function (_, args) {
      return facturas[args.indexId]
    },
    getFacturaByPeriodo: function (_, args) {
      let result;
      for (let i = 0, len = facturas.length; i < len; i++) {
        if (facturas[i]["periodo"] === args.periodo) {
          result = facturas[i];
          break;
        }
      }
      return result;
    },
  },

  Mutation: {
    // 2
    post: (parent, args) => {
      const factura = {
        id: `factura-${idCount++}`,
        periodo: args.periodo,
        monto: args.monto,
      }
      facturas.push(factura)
      return factura
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
})

server.start(() => console.log(`Server is running on http://localhost:4000`))


