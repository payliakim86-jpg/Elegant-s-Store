'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <MainLayout className="py-32">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-2">Сторінка не знайдена</p>
        <p className="text-gray-500 mb-8">Вибачте, сторінка яку ви шукаєте не існує</p>
        <Link href="/">
          <Button size="lg">На головну</Button>
        </Link>
      </div>
    </MainLayout>
  )
}
