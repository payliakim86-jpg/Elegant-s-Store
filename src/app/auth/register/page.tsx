'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { MainLayout } from '@/components/layout/MainLayout'
import Link from 'next/link'
import { validateEmail, validatePassword } from '@/utils/validators'

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = React.useState<Partial<typeof formData>>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [registerSuccess, setRegisterSuccess] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<typeof formData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ім\'я обов\'язкове' as any
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Прізвище обов\'язкове' as any
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Введіть дійсну email адресу' as any
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль має бути не менше 8 символів' as any
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Паролі не совпадают' as any
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Имитируем регистрацию
      setTimeout(() => {
        setIsLoading(false)
        setRegisterSuccess(true)
        setTimeout(() => {
          window.location.href = '/auth/login'
        }, 2000)
      }, 1500)
    }
  }

  if (registerSuccess) {
    return (
      <MainLayout className="py-16">
        <div className="max-w-md mx-auto text-center">
          <Alert type="success" title="Успіх!">
            Акаунт успішно створено. Перенаправлення на сторінку входу...
          </Alert>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Реєстрація</h1>
          <p className="text-gray-600">
            Вже маєте акаунт?{' '}
            <Link href="/auth/login" className="text-black font-semibold hover:underline">
              Вхід
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ім\'я"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName as string}
              required
            />
            <Input
              label="Прізвище"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName as string}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email as string}
            required
          />

          <Input
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password as string}
            helperText="Мінімум 8 символів"
            required
          />

          <Input
            label="Підтвердити пароль"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword as string}
            required
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Створити акаунт
          </Button>
        </form>
      </div>
    </MainLayout>
  )
}
