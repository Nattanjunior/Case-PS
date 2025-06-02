import { FastifyReply, FastifyRequest } from 'fastify'
import { listAssets } from '../services/asset.service'

export const list = async (_: FastifyRequest, reply: FastifyReply) => {
  const assets = await listAssets()
  return reply.send(assets)
}
