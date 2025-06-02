import { prisma } from '../lib/prisma'

export const listAssets = async () => {
  return prisma.asset.findMany()
}

