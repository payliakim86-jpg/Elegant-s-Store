'use client'

import React from 'react'
import Image from 'next/image'
import { CartItem as CartItemType } from '@/types/cart'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatters'

interface CartItemProps {
  item: CartItemType
  onRemove?: (id: string) => void
  onQuantityChange?: (id: string, quantity: number) => void
  className?: string
}

export function CartItem({ item, onRemove, onQuantityChange, className }: CartItemProps) {
  return (
    <div className={cn('flex gap-4 p-4 border border-gray-200 rounded-lg', className)}>
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        <p className="font-bold text-gray-900">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
          <button
            onClick={() => onQuantityChange?.(item.id, Math.max(1, item.quantity - 1))}
            className="px-2 py-1 hover:bg-gray-100 transition"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
            className="px-2 py-1 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
        {onRemove && (
          <Button
            onClick={() => onRemove(item.id)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Видалити
          </Button>
        )}
      </div>
    </div>
  )
}
