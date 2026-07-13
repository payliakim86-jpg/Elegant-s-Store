'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [userData, setUserData] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+380123456789',
    address: 'Kyiv, Ukraine',
  })

  const orders = [
    {
      id: '#12345678',
      date: '2024-01-15',
      total: '$299.99',
      status: 'Delivered',
      items: 2,
    },
    {
      id: '#12345679',
      date: '2024-01-20',
      total: '$129.99',
      status: 'Processing',
      items: 1,
    },
  ]

  return (
    <MainLayout className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Мій профіль</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Персональні дані</CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'secondary' : 'outline'}
                  size="sm"
                >
                  {isEditing ? 'Скасувати' : 'Редагувати'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Ім'я"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  disabled={!isEditing}
                />
                <Input
                  label="Прізвище"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <Input
                  label="Email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  disabled={!isEditing}
                />
                <Input
                  label="Телефон"
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  disabled={!isEditing}
                />
                <Input
                  label="Адреса"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              {isEditing && (
                <Button onClick={() => setIsEditing(false)} fullWidth className="mt-6">
                  Зберегти зміни
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Акаунт</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Статус</p>
                <p className="font-semibold">Активний</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Член з</p>
                <p className="font-semibold">15 січня 2024</p>
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                Змінити пароль
              </Button>
              <Button variant="danger" fullWidth>
                Вихід
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Історія замовлень</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Замовлення</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Дата</p>
                    <p className="font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Товарів</p>
                    <p className="font-semibold">{order.items}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Сума</p>
                    <p className="font-semibold">{order.total}</p>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        order.status === 'Delivered'
                          ? 'border-green-600 text-green-600'
                          : 'border-blue-600 text-blue-600'
                      }`}
                    >
                      {order.status}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
