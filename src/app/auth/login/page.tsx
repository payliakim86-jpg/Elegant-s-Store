'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { MainLayout } from '@/components/layout/MainLayout'
import Link from 'next/link'
import { validateEmail, validatePassword } from '@/utils/validators'

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState(''))
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [loginSuccess, setLoginSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!validateEmail(email)) {
      newErrors.email = 'Введіть дійсну email адресу'
    }
    if (!password) {
      newErrors.password = 'Пароль обов\'язковий'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Имитируем вход
      setTimeout(() => {
        setIsLoading(false)
        setLoginSuccess(true)
        setTimeout(() => {
          window.location.href = '/profile'
        }, 2000)
      }, 1500)
    }
  }

  if (loginSuccess) {
    return (
      <MainLayout className="py-16">
        <div className="max-w-md mx-auto text-center">
          <Alert type="success" title="Успіх!">
            Ви успішно увійшли до акаунту
          </Alert>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Вхід</h1>
          <p className="text-gray-600">
            Немаєте акаунту?{' '}
            <Link href="/auth/register" className="text-black font-semibold hover:underline">
              Реєстрація
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({ ...errors, email: '' })
            }}
            error={errors.email}
            required
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors({ ...errors, password: '' })
            }}
            error={errors.password}
            required
          />

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-gray-600 hover:text-black transition">
              Забули пароль?
            </Link>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Вхід
          </Button>
        </form>
      </div>
    </MainLayout>
  )
}
