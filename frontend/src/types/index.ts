export type Client = {
  id: string
  name: string
  email: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export type Asset = {
  id: string
  name: string
  value: number
  clientId: string
  client?: {
    name: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
  }
  createdAt: string
  updatedAt: string
}

export type CreateClientDTO = {
  name: string
  email: string
  status: 'ACTIVE' | 'INACTIVE'
}

export type UpdateClientDTO = Partial<CreateClientDTO>

export type CreateAssetDTO = {
  name: string
  value: number
}

export type UpdateAssetDTO = Partial<CreateAssetDTO>

export type Allocation = {
  id: string
  clientId: string
  assetId: string
  quantidade: number
  valorInvestido: number
  asset: Asset
  createdAt: string
  updatedAt: string
} 