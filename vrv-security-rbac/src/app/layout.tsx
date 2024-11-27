import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from 'next'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VRV Security RBAC Dashboard',
  description: 'Role-Based Access Control Dashboard for VRV Security',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}

