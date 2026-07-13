'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-gray-900 text-white mt-16', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">ES</span>
              </div>
              <span className="font-bold text-lg">Elegant Store</span>
            </div>
            <p className="text-gray-400 text-sm">Найкращий вибір стильних товарів для вас</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Товари</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products?category=clothing" className="hover:text-white transition">
                  Одяг
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-white transition">
                  Аксесуари
                </Link>
              </li>
              <li>
                <Link href="/products?category=shoes" className="hover:text-white transition">
                  Взуття
                </Link>
              </li>
              <li>
                <Link href="/products?category=bags" className="hover:text-white transition">
                  Сумки
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Компанія</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Контакти
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Правова інформація</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Умови використання
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Повернення
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Elegant Store. Всі права захищені.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
