'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function AboutPage() {
  return (
    <MainLayout className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Про нас</h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Наша історія</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Elegant Store - це сучасний інтернет-магазин стильного одягу та аксесуарів. Ми розпочали свою діяльність у
                2020 році з однією метою: надати своїм клієнтам найкраще поєднання якості, стилю та доступності.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Наша місія</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Ми віримо, що кожна людина заслуговує на доступ до якісного та стильного одягу. Наша місія - зробити моду
                доступною для всіх, пропонуючи широкий вибір товарів за конкурентними цінами.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Чому вибрати нас?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">✓</span>
                  <span>Великий вибір товарів від провідних брендів</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">✓</span>
                  <span>Конкурентні ціни та регулярні акції</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">✓</span>
                  <span>Швидка та надійна доставка</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">✓</span>
                  <span>Висока якість обслуговування</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
