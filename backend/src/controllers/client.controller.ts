import { FastifyReply, FastifyRequest } from 'fastify'
import * as clientService from '../services/client.service'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, status } = request.body as any
  const client = await clientService.createClient(name, email, status)
  return reply.code(201).send(client)
}

export const list = async (_: FastifyRequest, reply: FastifyReply) => {
  const clients = await clientService.getClients()
  return reply.send(clients)
}

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any
  const data = request.body as any
  const client = await clientService.updateClient(id, data)
  return reply.send(client)
}
