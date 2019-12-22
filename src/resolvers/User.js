function facturas(parent, args, context) {
    return context.prisma.user({ id: parent.id }).facturas()
  }
  
  module.exports = {
    facturas,
  }