import { PrismaClient, Status } from '@prisma/client'
import { CreateClientDTO, UpdateClientDTO } from '../dtos/client.dto'
import { validateEmail } from './email.service'
import { prisma } from '../lib/prisma'



export async function createClient(data: CreateClientDTO) {
  const emailValidation = await validateEmail(data.email)
  if (!emailValidation.isValid) {
    throw new Error(emailValidation.message)
  }

  return prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      status: data.status as Status
    }
  })
}

export async function getClients() {
  return prisma.client.findMany()
}

export async function updateClient(id: string, data: UpdateClientDTO) {
  const existingClient = await prisma.client.findUnique({
    where: { id }
  })

  if (!existingClient) {
    throw new Error('Cliente não encontrado')
  }

  if (data.email && data.email !== existingClient.email) {
    const emailValidation = await validateEmail(data.email)
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.message)
    }
  }

  return prisma.client.update({
    where: { id },
    data: {
      name: data.name ?? existingClient.name,
      email: data.email ?? existingClient.email,
      status: (data.status as Status) ?? existingClient.status
    }
  })
}

export const deleteClient = async (id: string) => {
  return prisma.client.delete({
    where: { id },
  })
}