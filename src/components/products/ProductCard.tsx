'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatters'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : null

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      if (onAddToCart) {
        onAddToCart(product)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className={cn('group cursor-pointer', className)}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Немає в наявності</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          {/* Category */}
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn('w-4 h-4', i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300')}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
            disabled={!product.inStock || isLoading}
            isLoading={isLoading}
            fullWidth
            variant={product.inStock ? 'primary' : 'secondary'}
          >
            {product.inStock ? 'До кошика' : 'Немає в наявності'}
          </Button>
        </div>
      </div>
    </Link>
  )
}

function formatDiscount(originalPrice: number, discountedPrice: number): string {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100
  return `${Math.round(discount)}%`
}
