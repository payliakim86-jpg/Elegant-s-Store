'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentMethod: 'card' | 'paypal' | 'bank'
}

interface CheckoutFormProps {
  onSubmit?: (data: CheckoutFormData) => void
  isLoading?: boolean
  className?: string
}

export function CheckoutForm({ onSubmit, isLoading, className }: CheckoutFormProps) {
  const [formData, setFormData] = React.useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ukraine',
    paymentMethod: 'card',
  })

  const [errors, setErrors] = React.useState<Partial<CheckoutFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'Ім\'я обов\'язкове' as any
    if (!formData.lastName.trim()) newErrors.lastName = 'Прізвище обов\'язкове' as any
    if (!formData.email.trim()) newErrors.email = 'Email обов\'язковий' as any
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обов\'язковий' as any
    if (!formData.address.trim()) newErrors.address = 'Адреса обов\'язкова' as any
    if (!formData.city.trim()) newErrors.city = 'Місто обов\'язкове' as any
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Поштовий код обов\'язковий' as any

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit?.(formData)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Інформація про доставку</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ім'я"
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

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
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
              label="Телефон"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone as string}
              required
            />
          </div>

          {/* Address */}
          <Input
            label="Адреса"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address as string}
            required
          />

          {/* City, State, Zip */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Місто"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city as string}
              required
            />
            <Input
              label="Область"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <Input
              label="Поштовий код"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode as string}
              required
            />
          </div>

          {/* Country & Payment */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Країна"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={[
                { value: 'Ukraine', label: 'Україна' },
                { value: 'Poland', label: 'Польща' },
                { value: 'Germany', label: 'Німеччина' },
              ]}
            />
            <Select
              label="Спосіб оплати"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              options={[
                { value: 'card', label: 'Кредитна карта' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'bank', label: 'Банківський переказ' },
              ]}
            />
          </div>

          <Button type="submit" isLoading={isLoading} fullWidth>
            Продовжити
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
