import { FastifyInstance } from 'fastify'
import * as allocationController from '../controllers/allocation.controller'

export async function allocationRoutes(app: FastifyInstance) {
  app.get('/clients/:clientId/allocations', allocationController.listByClient)
  app.post('/clients/:clientId/allocations', allocationController.create)
  app.put('/clients/:clientId/allocations/:allocationId', allocationController.update)
  app.delete('/clients/:clientId/allocations/:allocationId', allocationController.remove)
} 