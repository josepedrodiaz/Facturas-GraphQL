function nuevaFacturaSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.factura({ mutation_in: ['CREATED'] }).node()
  }
  
  const nuevaFactura = {
    subscribe: nuevaFacturaSubscribe,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    nuevaFactura,
  }