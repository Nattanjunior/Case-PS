import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <h1 className="text-4xl font-bold">Sistema de Investimentos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/clients" className="w-full">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>Gerencie seus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Acessar</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/assets" className="w-full">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle>Ativos</CardTitle>
              <CardDescription>Visualize os ativos financeiros</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Acessar</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
} 