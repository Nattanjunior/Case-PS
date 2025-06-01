import { prisma } from '../lib/prisma'
import { CreateAssetDTO, UpdateAssetDTO } from '../dtos/asset.dto'

const staticAssets = [
    { name: 'Ação XYZ', value: 100.0 },
    { name: 'Fundo ABC', value: 250.5 },
    { name: 'Cripto DEF', value: 340.0 },
  ]
  
  export const getStaticAssets = () => staticAssets

  
  export async function getAssetsByClient(clientId: string) {
    return prisma.asset.findMany({
      where: { clientId },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            status: true
          }
        }
      }
    })
  }
  
  export async function createAsset(clientId: string, data: CreateAssetDTO) {
    return prisma.asset.create({
      data: {
        ...data,
        clientId
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            status: true
          }
        }
      }
    })
  }
  
  export async function updateAsset(assetId: string, clientId: string, data: UpdateAssetDTO) {
    return prisma.asset.update({
      where: {
        id: assetId,
        clientId
      },
      data,
      include: {
        client: {
          select: {
            name: true,
            email: true,
            status: true
          }
        }
      }
    })
  }
  
  export async function deleteAsset(assetId: string, clientId: string) {
    return prisma.asset.delete({
      where: {
        id: assetId,
        clientId
      }
    })
  }
  