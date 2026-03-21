'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, List, LogOut, Shield } from 'lucide-react'

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Create', icon: Plus },
    { href: '/admin/manage', label: 'Posts', icon: List },
  ]

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] supports-[backdrop-filter]:bg-neutral-900/60">
        <Link 
          href="/admin" 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white mr-1 ml-0.5 hover:bg-white/20 transition-colors"
        >
          <Shield className="w-4 h-4" />
        </Link>

        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${isActive 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'}
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <div className="w-px h-4 bg-white/10 mx-1" />

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center justify-center w-8 h-8 rounded-full text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>
  )
}