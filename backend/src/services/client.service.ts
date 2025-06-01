import { prisma } from '../lib/prisma'

export const createClient = async (name: string, email: string, status: 'ACTIVE' | 'INACTIVE') => {
  return prisma.client.create({
    data: { name, email, status },
  })
}

export const getClients = async () => {
  return prisma.client.findMany()
}

export const updateClient = async (id: string, data: { name?: string; email?: string; status?: 'ACTIVE' | 'INACTIVE' }) => {
  return prisma.client.update({
    where: { id },
    data,
  })
}

export const deleteClient = async (id: string) => {
  return prisma.client.delete({
    where: { id },
  })
}