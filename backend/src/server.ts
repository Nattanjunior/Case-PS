
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clientRoutes } from './routes/client.routes'
import { assetRoutes } from './routes/asset.routes'
import dotenv from 'dotenv'

dotenv.config()

export const app = Fastify()

app.register(cors)
app.register(clientRoutes)
app.register(assetRoutes)


const PORT = process.env.PORT || 3333

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Server listening at ${address}`)
})