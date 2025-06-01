import { FastifyReply, FastifyRequest } from 'fastify'
import { getStaticAssets } from '../services/asset.service'

export const list = async (_: FastifyRequest, reply: FastifyReply) => {
  const assets = getStaticAssets()
  return reply.send(assets)
}
