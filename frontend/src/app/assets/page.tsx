'use client'

import { useQuery } from '@tanstack/react-query'
import { assetsService } from '@/services/assets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function AssetsPage() {
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: assetsService.list
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar ativos</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Ativos Financeiros</h1>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets?.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(asset.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 