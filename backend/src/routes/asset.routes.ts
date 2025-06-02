import { FastifyInstance } from 'fastify'
import * as assetController from '../controllers/asset.controller'

export async function assetRoutes(app: FastifyInstance) {
  app.get('/assets', assetController.list)
}
