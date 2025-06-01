import { FastifyReply, FastifyRequest } from 'fastify'
import { getStaticAssets, getAssetsByClient, createAsset, updateAsset, deleteAsset } from '../services/asset.service'
import { createAssetSchema, updateAssetSchema } from '../dtos/asset.dto'

export const list = async (_: FastifyRequest, reply: FastifyReply) => {
  const assets = getStaticAssets()
  return reply.send(assets)
}

export const listByClient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId } = request.params as { clientId: string }
    const assets = await getAssetsByClient(clientId)
    return reply.send(assets)
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId } = request.params as { clientId: string }
    const data = createAssetSchema.parse(request.body)
    const asset = await createAsset(clientId, data)
    return reply.code(201).send(asset)
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId, assetId } = request.params as { clientId: string; assetId: string }
    const data = updateAssetSchema.parse(request.body)
    const asset = await updateAsset(assetId, clientId, data)
    return reply.send(asset)
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { clientId, assetId } = request.params as { clientId: string; assetId: string }
    await deleteAsset(assetId, clientId)
    return reply.code(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message })
    }
    return reply.code(500).send({ error: 'Erro interno do servidor' })
  }
}
