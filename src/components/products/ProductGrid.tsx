'use client'

import React from 'react'
import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { cn } from '@/utils/cn'

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export function ProductGrid({ products, onAddToCart, className, columns = 4 }: ProductGridProps) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn(`grid ${gridColsClass[columns]} gap-6`, className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
