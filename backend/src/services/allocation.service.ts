import { prisma } from '../lib/prisma'
import { getAssetById } from './asset.service'

export async function listAllocationsByClient(clientId: string) {
  return prisma.allocation.findMany({
    where: { clientId },
    include: {
      asset: true
    }
  })
}

export async function createAllocation(clientId: string, data: { assetId: string, quantidade: number, valorInvestido: number }) {
  const existingAllocation = await prisma.allocation.findUnique({
    where: {
      clientId_assetId: {
        clientId: clientId,
        assetId: data.assetId,
      },
    },
    include: {
      asset: true
    }
  });

  if (existingAllocation) {
    const newQuantidade = existingAllocation.quantidade + data.quantidade;

    const asset = await getAssetById(data.assetId);
    if (!asset) {
        throw new Error('Ativo não encontrado.');
    }
    const newValorInvestido = newQuantidade * asset.value;

    return prisma.allocation.update({
      where: {
        id: existingAllocation.id,
      },
      data: {
        quantidade: newQuantidade,
        valorInvestido: newValorInvestido,
      },
      include: {
        asset: true
      }
    });
  } else {
    const asset = await getAssetById(data.assetId);
    if (!asset) {
        throw new Error('Ativo não encontrado.'); 
    }
    const calculatedValorInvestido = data.quantidade * asset.value;

    return prisma.allocation.create({
      data: {
        clientId,
        assetId: data.assetId,
        quantidade: data.quantidade,
        valorInvestido: calculatedValorInvestido,
      },
      include: {
        asset: true
      }
    });
  }
}

// export async function updateAllocation(allocationId: string, clientId: string, data: { quantidade: number, valorInvestido: number }) {
//   return prisma.allocation.update({
//     where: {
//       id: allocationId,
//       clientId
//     },
//     data,
//     include: {
//       asset: true
//     }
//   })
// }

export async function deleteAllocation(allocationId: string, clientId: string) {
  return prisma.allocation.delete({
    where: {
      id: allocationId,
      clientId
    }
  })
} 