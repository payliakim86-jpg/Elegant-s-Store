'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <MainLayout className="py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Elegant Store</h1>
        <p className="text-xl text-gray-600 mb-8">Відкрийте для себе колекцію стильного одягу та аксесуарів</p>
        <Link href="/products">
          <Button size="lg">Переглянути каталог</Button>
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-lg flex items-center justify-center text-white text-2xl">✓</div>
          <h3 className="font-bold text-lg mb-2">Якісні товари</h3>
          <p className="text-gray-600">Кращий вибір товарів від перевірених виробників</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-lg flex items-center justify-center text-white text-2xl">🚚</div>
          <h3 className="font-bold text-lg mb-2">Швидка доставка</h3>
          <p className="text-gray-600">Безкоштовна доставка для замовлень від 50$</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-lg flex items-center justify-center text-white text-2xl">💳</div>
          <h3 className="font-bold text-lg mb-2">Безпечна оплата</h3>
          <p className="text-gray-600">Захищена оплата усіма популярними способами</p>
        </div>
      </section>
    </MainLayout>
  )
}
