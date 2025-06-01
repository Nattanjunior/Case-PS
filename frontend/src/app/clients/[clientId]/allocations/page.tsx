'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { clientsService } from '@/services/clients'
import { assetsService } from '@/services/assets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Client } from '@/types'
import { TrashIcon } from 'lucide-react'

export default function ClientAllocationsPage() {
  const params = useParams()
  const clientId = params.clientId as string

  const { data: client, isLoading: isLoadingClient, error: errorClient } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => clientsService.list().then(clients => clients.find(c => c.id === clientId)),
    enabled: !!clientId,
  })

  const { data: assets, isLoading: isLoadingAssets, error: errorAssets } = useQuery({
    queryKey: ['client-assets', clientId],
    queryFn: () => assetsService.listByClient(clientId),
    enabled: !!clientId,
  })

  if (isLoadingClient || isLoadingAssets) {
    return <div>Carregando alocações...</div>
  }

  if (errorClient || errorAssets) {
    return <div>Erro ao carregar alocações do cliente.</div>
  }

  if (!client) {
    return <div>Cliente não encontrado.</div>
  }

  // Calcular total investido e quantidade de ativos
  const totalInvested = assets?.reduce((sum, asset) => sum + asset.value, 0) || 0
  const totalAssets = assets?.length || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Alocações de Ativos - {client.name}</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">+ Adicionar Alocação</Button>
      </div>

      {/* Informações do Cliente */}
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-4 p-6">
          {/* Sem imagem do usuário */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{client.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{client.email}</span>
          </div>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${client.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
          </span>
        </CardContent>
      </Card>

      {/* Tabela de Ativos Alocados */}
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
                {assets?.map((asset) => (
                  <TableRow key={asset.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="font-medium w-[150px]">{asset.name}</TableCell>
                    <TableCell className="w-[100px]">
                     {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(asset.value)}
                  </TableCell>
                   {/* Coluna de Quantidade (placeholder por enquanto) */}
                  <TableCell className="w-[100px]">100</TableCell> {/* TODO: Implementar quantidade real */}
                  <TableCell className="text-right w-[100px]">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(asset.value * 100)} {/* TODO: Calcular valor total real */}
                  </TableCell>
                  <TableCell className="text-right w-[80px]">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClientClick(asset.id)} className="text-gray-500 hover:text-gray-700"><TrashIcon className="size-4 w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
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
    </div>
  )
} 