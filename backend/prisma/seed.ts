import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const staticAssets = [
  { id: 'asset-xyz', name: 'Ação XYZ', value: 100.0 },
  { id: 'asset-abc', name: 'Fundo ABC', value: 250.5 },
  { id: 'asset-def', name: 'Cripto DEF', value: 340.0 },
  { id: 'asset-ghi', name: 'Tesouro Direto', value: 10.50 },
  { id: 'asset-jkl', name: 'Fundo Imobiliário', value: 95.70 },
]

async function main() {

  for (const assetData of staticAssets) {
    await prisma.asset.upsert({
      where: { id: assetData.id },
      update: {},
      create: assetData,
    })
    console.log(`Criado ou atualizado ativo com ID: ${assetData.id}`)
  }

  console.log('Seed finalizado.')
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 