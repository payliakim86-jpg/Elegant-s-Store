'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { CartItem } from '@/components/cart/CartItem'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { PromoCodeInput } from '@/components/cart/PromoCodeInput'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { CartItem as CartItemType } from '@/types/cart'
import Link from 'next/link'

// Mock data
const mockCartItems: CartItemType[] = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    category: 'Clothing',
  },
  {
    id: '2',
    name: 'Elegant Black Shoes',
    price: 129.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Shoes',
  },
]

export default function CartPage() {
  const [items, setItems] = React.useState<CartItemType[]>(mockCartItems)
  const [discount, setDiscount] = React.useState(0)
  const [isPromoLoading, setIsPromoLoading] = React.useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = subtotal + shipping + tax - discount

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(id)
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const handleApplyPromo = (code: string) => {
    setIsPromoLoading(true)
    // Имитируем проверку промокода
    setTimeout(() => {
      if (code.toUpperCase() === 'SAVE10') {
        setDiscount(Math.round(subtotal * 0.1 * 100) / 100)
      }
      setIsPromoLoading(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <MainLayout className="py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ваш кошик порожній</h1>
          <p className="text-gray-600 mb-8">Додайте товари до кошика, щоб продовжити</p>
          <Link href="/products">
            <Button size="lg">Перегляну каталог</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Кошик</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          {/* Promo Code */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Есть промокод?</h2>
            <PromoCodeInput onApply={handleApplyPromo} isLoading={isPromoLoading} />
            {discount > 0 && (
              <Alert type="success" title="Промокод применен" className="mt-4">
                Скидка: ${discount.toFixed(2)}
              </Alert>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            onCheckout={() => {
              window.location.href = '/checkout'
            }}
          />
        </div>
      </div>
    </MainLayout>
  )
}
