const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  
    const password = await bcrypt.hash(args.password, 10)
  
    const user = await context.prisma.createUser({ ...args, password })
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
      throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }   
    let expirationDate = (Math.floor(Date.now() / 1000) + (60 * 25)) //25'
    const token = jwt.sign({ exp: expirationDate, userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }

  function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createFactura({
      periodo: args.periodo,
      monto: args.monto,
      cuenta: { connect: { id: userId } },
    })
  }

  async function nota(parent, args, context, info) {
    const userId = getUserId(context)
    const anotado = await context.prisma.$exists.nota({
      user: { id: userId },
      factura: { id: args.facturaId },
    })
    if (anotado) {
      throw new Error(`Ya anotaste esta factura: ${args.facturaId}`)
    }
  
    // 3
    return context.prisma.createNota({
      user: { connect: { id: userId } },
      factura: { connect: { id: args.facturaId } },
      contenido: { connect: { id: args.contenido } },
    })
  }
  
  module.exports = {
    signup,
    login,
    post,
  }