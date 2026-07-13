'use client'

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { cn } from '@/utils/cn'

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
}

export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn('flex flex-col min-h-screen bg-white', className)}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
