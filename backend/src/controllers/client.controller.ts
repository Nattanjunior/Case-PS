import { FastifyReply, FastifyRequest } from 'fastify'
import * as clientService from '../services/client.service'
import { createClientSchema, updateClientSchema } from '../dtos/client.dto'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = createClientSchema.parse(request.body)
    const client = await clientService.createClient(data)
    return reply.code(201).send(client)
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const list = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const clients = await clientService.getClients()
    return reply.send(clients)
  } catch (error) {
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }
    const data = updateClientSchema.parse(request.body)
    const client = await clientService.updateClient(id, data)
    return reply.send(client)
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }
    await clientService.deleteClient(id)
    return reply.code(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}
