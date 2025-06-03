import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clientRoutes } from './routes/client.routes'
import { assetRoutes } from './routes/asset.routes'
import { allocationRoutes } from './routes/allocation.routes'
import dotenv from 'dotenv'

dotenv.config()

export const app = Fastify()

app.register(cors, {
  origin: '*' , // Ou defina um domínio específico como 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})
app.register(clientRoutes)
app.register(assetRoutes)
app.register(allocationRoutes)


const PORT = process.env.PORT || 3333

app.listen({ port: Number(PORT), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Server listening at ${address}`)
})