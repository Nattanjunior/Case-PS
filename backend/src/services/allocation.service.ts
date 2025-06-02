import { prisma } from '../lib/prisma'

export async function listAllocationsByClient(clientId: string) {
  return prisma.allocation.findMany({
    where: { clientId },
    include: {
      asset: true
    }
  })
}

export async function createAllocation(clientId: string, data: { assetId: string, quantidade: number, valorInvestido: number }) {
  return prisma.allocation.create({
    data: {
      clientId,
      assetId: data.assetId,
      quantidade: data.quantidade,
      valorInvestido: data.valorInvestido
    },
    include: {
      asset: true
    }
  })
}

export async function updateAllocation(allocationId: string, clientId: string, data: { quantidade: number, valorInvestido: number }) {
  return prisma.allocation.update({
    where: {
      id: allocationId,
      clientId
    },
    data,
    include: {
      asset: true
    }
  })
}

export async function deleteAllocation(allocationId: string, clientId: string) {
  return prisma.allocation.delete({
    where: {
      id: allocationId,
      clientId
    }
  })
} 