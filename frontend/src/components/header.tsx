'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/clients', label: 'Clients' },
    { href: '/assets', label: 'Assets' },
  ]

  return (
    <header className="border-b sticky top-0 z-10 bg-white">
      <div className="container mx-auto flex items-center px-6 py-4">
        <div className="mr-6 text-2xl text-blue-600">🏛️</div>

        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-gray-500 hover:text-black text-sm font-medium transition',
                pathname === link.href && 'text-black'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
