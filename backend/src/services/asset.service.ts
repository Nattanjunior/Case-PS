import { prisma } from '../lib/prisma'

export const listAssets = async () => {
  return prisma.asset.findMany()
}

export const getAssetById = async (assetId: string) => {
  return prisma.asset.findUnique({
    where: {
      id: assetId
    }
  })
}

