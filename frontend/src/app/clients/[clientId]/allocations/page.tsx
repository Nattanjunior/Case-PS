'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { clientsService } from '@/services/clients'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Client } from '@/types'
import { TrashIcon } from 'lucide-react'
import { getAllocationsByClient, deleteAllocation, createAllocation } from '@/services/allocations'
import { Allocation } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { assetsService } from '@/services/assets'
import { toast } from 'sonner'

export default function ClientAllocationsPage() {
  const params = useParams()
  const clientId = params.clientId as string

  const { data: client, isLoading: isLoadingClient, error: errorClient } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => clientsService.list().then(clients => clients.find(c => c.id === clientId)),
    enabled: !!clientId,
  })

  const { data: allocations, isLoading: isLoadingAllocations, error: errorAllocations, refetch } = useQuery<Allocation[]>({
    queryKey: ['client-allocations', clientId],
    queryFn: () => getAllocationsByClient(clientId),
    enabled: !!clientId,
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>(undefined)
  const [quantidade, setQuantidade] = useState<number>(1)
  const queryClient = useQueryClient()

  const { data: assetsList, isLoading: isLoadingAssetsList } = useQuery({
    queryKey: ['assets'],
    queryFn: assetsService.list
  })

  if (isLoadingClient || isLoadingAllocations || isLoadingAssetsList) {
    return <div>Carregando alocações...</div>
  }

  if (errorClient || errorAllocations) {
    return <div>Erro ao carregar alocações do cliente.</div>
  }

  if (!client) {
    return <div>Cliente não encontrado.</div>
  }

  const totalInvested = allocations?.reduce((sum, allocation) => sum + allocation.valorInvestido, 0) || 0
  const totalAssets = allocations?.length || 0

  async function handleDeleteAllocationClick(allocationId: string) {
    await deleteAllocation(clientId, allocationId)
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Alocações de Ativos - {client.name}</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap" onClick={() => setModalOpen(true)}>+ Adicionar Alocação</Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{client.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{client.email}</span>
          </div>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${client.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
          </span>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Ativos Alocados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Nome do Ativo</TableHead>
                  <TableHead className="w-[100px]">Valor Atual</TableHead>
                  <TableHead className="w-[100px]">Quantidade</TableHead>
                  <TableHead className="text-right w-[100px]">Valor Total</TableHead>
                  <TableHead className="text-right w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations?.map((allocation) => (
                  <TableRow key={allocation.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="font-medium w-[150px]">{allocation.asset.name}</TableCell>
                    <TableCell className="w-[100px]">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(allocation.asset.value)}
                    </TableCell>
                    <TableCell className="w-[100px]">{allocation.quantidade}</TableCell>
                    <TableCell className="text-right w-[100px]">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(allocation.valorInvestido)}
                    </TableCell>
                    <TableCell className="text-right w-[80px]">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAllocationClick(allocation.id)} className="text-gray-500 hover:text-gray-700">
                        <TrashIcon className="size-4 w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <span className="text-blue-600 dark:text-blue-400">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalInvested)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos Alocados</CardTitle>
            <span className="text-green-600 dark:text-green-400">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets} ativos</div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6">
          <DialogHeader>
            <DialogTitle>Adicionar Alocação</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!selectedAssetId || quantidade <= 0) {
                toast.error('Por favor, selecione um ativo e informe a quantidade.')
                return
              }
              const selectedAsset = assetsList?.find(asset => asset.id === selectedAssetId)
              if (!selectedAsset) {
                toast.error('Ativo selecionado inválido.')
                return
              }
              const calculatedValorInvestido = selectedAsset.value * quantidade

              try {
                await createAllocation(clientId, { assetId: selectedAssetId, quantidade, valorInvestido: calculatedValorInvestido })
                toast.success('Alocação criada com sucesso!')
                setModalOpen(false)
                setSelectedAssetId('')
                setQuantidade(1)
                queryClient.invalidateQueries({ queryKey: ['client-allocations', clientId] })
              } catch (error) {
                toast.error('Erro ao criar alocação. Tente novamente.')
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Ativo</Label>
              <Select value={selectedAssetId} onValueChange={(value) => {
                setSelectedAssetId(value)
              }}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700">
                  <SelectValue placeholder="Selecione um ativo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900">
                  {assetsList?.map((asset) => {
                    console.log('Creating SelectItem for asset:', asset.id, 'Type:', typeof asset.id, asset.name, asset.value)
                    return (
                      <SelectItem key={asset.id} value={asset.id} className="focus:bg-gray-100 dark:focus:bg-zinc-800">
                        {asset.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade" className="text-gray-700 dark:text-gray-300">Quantidade</Label>
              <Input id="quantidade" type="number" min={1} value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} required className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white" />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-600">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
