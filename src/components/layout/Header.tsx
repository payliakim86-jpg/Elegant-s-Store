'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className={cn('bg-white border-b border-gray-200 sticky top-0 z-40', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Elegant Store</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 hover:text-black transition">
              Каталог
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-black transition">
              Про нас
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black transition">
              Контакти
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-lg transition hidden sm:block">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition">
              Каталог
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition">
              Про нас
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition">
              Контакти
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
