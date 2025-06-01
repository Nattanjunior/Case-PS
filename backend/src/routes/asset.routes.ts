import { FastifyInstance } from 'fastify'
import * as assetController from '../controllers/asset.controller'

export async function assetRoutes(app: FastifyInstance) {
  app.get('/assets', assetController.list)
  app.get('/clients/:clientId/assets', assetController.listByClient)
  app.post('/clients/:clientId/assets', assetController.create)
  app.put('/clients/:clientId/assets/:assetId', assetController.update)
  app.delete('/clients/:clientId/assets/:assetId', assetController.remove)
}
