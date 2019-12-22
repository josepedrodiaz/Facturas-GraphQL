function cuenta(parent, args, context) {
    return context.prisma.factura({ id: parent.id }).cuenta()
  }
  
  module.exports = {
    cuenta,
  }