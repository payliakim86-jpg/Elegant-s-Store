'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

export interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  discount?: number
  className?: string
  onCheckout?: () => void
  isLoading?: boolean
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  discount = 0,
  className,
  onCheckout,
  isLoading,
}: OrderSummaryProps) {
  const total = subtotal + shipping + tax - discount

  return (
    <Card className={cn('sticky top-20', className)}>
      <CardHeader>
        <CardTitle>Сума замовлення</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Субітог:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Знижка:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Податок:</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Доставка:</span>
          <span>{shipping === 0 ? 'Безкоштовно' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
          <span>Всього:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {onCheckout && (
          <Button onClick={onCheckout} isLoading={isLoading} fullWidth>
            Оформити замовлення
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
