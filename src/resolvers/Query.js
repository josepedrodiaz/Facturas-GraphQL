const { APP_SECRET, getUserId } = require('../utils')

function info() {
    return 'Esta es mi API de Facturas'
  }
function feed(parent, args, context, info) {
  //validate token
  const userId = getUserId(context)

    return context.prisma.facturas()
  }
  
  module.exports = {
    feed,
    info,
  }