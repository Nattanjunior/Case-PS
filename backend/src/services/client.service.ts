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
  if (data.email) {
    const emailValidation = await validateEmail(data.email)
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.message)
    }
  }

  return prisma.client.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      status: data.status as Status
    }
  })
}

export const deleteClient = async (id: string) => {
  return prisma.client.delete({
    where: { id },
  })
}