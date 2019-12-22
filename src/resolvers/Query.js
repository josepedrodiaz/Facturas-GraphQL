function info() {
    return 'Esta es mi API de Facturas'
  }
function feed(parent, args, context, info) {
    return context.prisma.facturas()
  }
  
  module.exports = {
    feed,
    info,
  }