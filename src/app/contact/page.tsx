'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [messageSent, setMessageSent] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Имитируем отправку сообщения
    setTimeout(() => {
      setIsLoading(false)
      setMessageSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setMessageSent(false), 3000)
    }, 1500)
  }

  return (
    <MainLayout className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Контактуйте з нами</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Адреса</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">вул. Хрещатик, 1</p>
                <p className="text-gray-600">Київ, Україна 01001</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">+380 (44) 123-45-67</p>
                <p className="text-gray-600">Пн-Пт: 09:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">info@elegantstore.ua</p>
                <p className="text-gray-600">support@elegantstore.ua</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Відправити повідомлення</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Ім'я"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Повідомлення
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Відправити
                </Button>
              </form>
              {messageSent && (
                <Alert type="success" title="Успіх!" className="mt-4">
                  Ваше повідомлення було відправлено
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
