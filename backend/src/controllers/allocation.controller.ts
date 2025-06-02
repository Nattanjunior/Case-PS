import { FastifyReply, FastifyRequest } from 'fastify'
import { listAllocationsByClient, createAllocation, updateAllocation, deleteAllocation } from '../services/allocation.service'

export const listByClient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId } = request.params as { clientId: string }
    const allocations = await listAllocationsByClient(clientId)
    return reply.send(allocations)
  } catch (error) {
    return reply.code(500).send({ error: 'Erro ao listar alocações' })
  }
}

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId } = request.params as { clientId: string }
    const { assetId, quantidade, valorInvestido } = request.body as { assetId: string, quantidade: number, valorInvestido: number }
    const allocation = await createAllocation(clientId, { assetId, quantidade, valorInvestido })
    return reply.code(201).send(allocation)
  } catch (error: any) {
    return reply.code(500).send({ error: 'Erro ao criar alocação no servidor' })
  }
}

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId, allocationId } = request.params as { clientId: string, allocationId: string }
    const { quantidade, valorInvestido } = request.body as { quantidade: number, valorInvestido: number }
    const allocation = await updateAllocation(allocationId, clientId, { quantidade, valorInvestido })
    return reply.send(allocation)
  } catch (error) {
    return reply.code(500).send({ error: 'Erro ao atualizar alocação' })
  }
}

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId, allocationId } = request.params as { clientId: string, allocationId: string }
    await deleteAllocation(allocationId, clientId)
    return reply.code(204).send()
  } catch (error) {
    return reply.code(500).send({ error: 'Erro ao remover alocação' })
  }
} 