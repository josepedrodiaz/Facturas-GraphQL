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
   info: () => 'Esta es la API de un Hackernews Clone',
   feed: () => facturas,
   factura: (args) => {
      // var index = facturas.indexOf(id)
      // if (index == -1) {
      //   return false
      // }else{
        return facturas[args.indexId]
      //}
    }
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

    // put: (parent, args) => {

    //  var index = facturas.indexOf(args.id);
     
    //  if (index !== -1) {
    //    facturas[index].periodo = args.periodo
    //    facturas[index].monto = args.monto
    //    return facturas[index]
    //  }else{
    //    return false;
    //  }
    
    // },

  //   delete: (parent, args) => {

  //     var index = facturas.indexOf(args.id);
  //     if (index !== -1) {
  //       array.splice(index, 1);
  //       return facturas
  //     }else{
  //       return false;
  //     }

     
  //  }
  }

}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))


