import { FastifyInstance } from 'fastify'
import * as clientController from '../controllers/client.controller'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/clients', clientController.create)
  app.get('/clients', clientController.list)
  app.put('/clients/:id', clientController.update)
}
