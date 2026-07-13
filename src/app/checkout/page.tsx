'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

const checkoutSteps = [
  { id: 'shipping', label: 'Доставка' },
  { id: 'payment', label: 'Оплата' },
  { id: 'confirmation', label: 'Підтвердження' },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [orderConfirmed, setOrderConfirmed] = React.useState(false)

  const subtotal = 429.98
  const shipping = 0
  const tax = 42.99

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Имитируем отправку данных
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      if (currentStep < checkoutSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setOrderConfirmed(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (orderConfirmed) {
    return (
      <MainLayout className="py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-4xl">
            ✓
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Дякуємо за замовлення!</h1>
          <p className="text-gray-600 mb-8">Ваше замовлення було успішно розміщено. Ви отримаєте підтвердження на email.</p>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>Номер замовлення:</strong> #12345678
            </p>
            <p className="text-sm text-gray-600">
              <strong>Сума:</strong> $472.97
            </p>
          </div>
          <Button onClick={() => (window.location.href = '/')} fullWidth className="mt-8">
            На головну
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Оформлення замовлення</h1>

      {/* Steps */}
      <CheckoutSteps steps={checkoutSteps} currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
          {currentStep === 1 && (
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Оплата</h2>
              <Alert type="info" title="Інформація">
                В цій демо версії платіж не проводиться. Натисніть кнопку далі для завершення.
              </Alert>
              <Button onClick={() => handleSubmit({})} isLoading={isLoading} fullWidth className="mt-6">
                Завершити замовлення
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
          />
        </div>
      </div>
    </MainLayout>
  )
}
