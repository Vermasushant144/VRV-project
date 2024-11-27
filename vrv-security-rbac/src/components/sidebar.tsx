'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, UserCog, Shield, Menu, X, BarChart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/roles', label: 'Roles', icon: UserCog },
  { href: '/permissions', label: 'Permissions', icon: Shield },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <aside className={`bg-white dark:bg-gray-800 w-64 min-h-screen p-4 fixed left-0 top-0 transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">VRV Security</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">RBAC Dashboard</p>
          </div>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-gray-200 dark:bg-gray-700 text-primary'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 VRV Security</p>
          </div>
        </div>
      </aside>
    </>
  )
}

