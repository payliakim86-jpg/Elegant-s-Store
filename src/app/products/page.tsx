'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'
import { SortOptions } from '@/components/products/SortOptions'
import { Product } from '@/types/product'

// Mock data - замінити на реальні дані з API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    category: 'Clothing',
    description: 'High-quality leather jacket for men',
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Elegant Black Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Shoes',
    description: 'Comfortable and stylish black shoes',
    inStock: true,
    rating: 4.8,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Designer Handbag',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    description: 'Luxury designer handbag',
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Classic Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523170335684-f042655cbdba?w=500&h=500&fit=crop',
    category: 'Accessories',
    description: 'Timeless classic watch',
    inStock: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: '5',
    name: 'Casual T-Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Clothing',
    description: 'Comfortable casual t-shirt',
    inStock: true,
    rating: 4.4,
    reviews: 89,
  },
  {
    id: '6',
    name: 'Sports Sneakers',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Shoes',
    description: 'Professional sports sneakers',
    inStock: false,
    rating: 4.9,
    reviews: 234,
  },
]

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating'

export default function ProductsPage() {
  const [sortBy, setSortBy] = React.useState<SortOption>('newest')
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(mockProducts)

  const mockCategories = [
    { id: 'clothing', label: 'Одяг' },
    { id: 'shoes', label: 'Взуття' },
    { id: 'bags', label: 'Сумки' },
    { id: 'accessories', label: 'Аксесуари' },
  ]

  const mockSizes = [
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
  ]

  const mockColors = [
    { id: 'black', label: 'Black' },
    { id: 'white', label: 'White' },
    { id: 'blue', label: 'Blue' },
    { id: 'red', label: 'Red' },
  ]

  const handleFilterChange = (filters: any) => {
    // Логіка фільтрації
    setFilteredProducts(mockProducts)
  }

  const handleSort = (products: Product[], sort: SortOption) => {
    const sorted = [...products]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'popular':
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        break
      default:
        // newest - залишити як є
        break
    }
    return sorted
  }

  const sortedProducts = handleSort(filteredProducts, sortBy)

  return (
    <MainLayout className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Каталог товарів</h1>
        <p className="text-gray-600">Знайдіть ідеальний товар для себе</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <ProductFilters
            categories={mockCategories}
            sizes={mockSizes}
            colors={mockColors}
            priceRange={[0, 500]}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Sort */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">{sortedProducts.length} товарів</p>
            <SortOptions value={sortBy} onChange={setSortBy} />
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} columns={3} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Товари не знайдені</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
