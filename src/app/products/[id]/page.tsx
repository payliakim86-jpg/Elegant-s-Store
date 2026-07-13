'use client'

import React from 'react'
import Image from 'next/image'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Product } from '@/types/product'
import { formatPrice } from '@/utils/formatters'

// Mock data
const mockProduct: Product = {
  id: '1',
  name: 'Premium Leather Jacket',
  price: 299.99,
  originalPrice: 399.99,
  image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&h=800&fit=crop',
  category: 'Clothing',
  description: 'Exceptional quality premium leather jacket crafted with the finest materials. Perfect for any occasion.',
  inStock: true,
  rating: 4.5,
  reviews: 128,
}

const mockRelatedProducts: Product[] = [
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
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    description: 'Luxury designer handbag',
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
]

export default function ProductDetailPage() {
  const [quantity, setQuantity] = React.useState(1)
  const [selectedSize, setSelectedSize] = React.useState('M')
  const [selectedColor, setSelectedColor] = React.useState('Black')
  const [isAdded, setIsAdded] = React.useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 3000)
  }

  const discount = mockProduct.originalPrice
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0

  return (
    <MainLayout className="py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-8">
        <a href="/products" className="hover:text-black transition">Каталог</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-black transition">{mockProduct.category}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{mockProduct.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Image */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
            <Image
              src={mockProduct.image}
              alt={mockProduct.name}
              fill
              className="object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                -{discount}%
              </div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg aspect-square cursor-pointer hover:opacity-75 transition" />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {/* Title & Rating */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{mockProduct.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(mockProduct.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">({mockProduct.reviews} відгуків)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-gray-900">{formatPrice(mockProduct.price)}</span>
              {mockProduct.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(mockProduct.originalPrice)}</span>
              )}
            </div>
            <p className="text-green-600 font-semibold">В наявності</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8">{mockProduct.description}</p>

          {/* Options */}
          <Card className="mb-8">
            <CardContent className="space-y-6">
              {/* Size */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">Розмір</label>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">Колір</label>
                <div className="flex gap-3">
                  {['Black', 'White', 'Brown'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold text-gray-900 mb-3">Кількість</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} fullWidth size="lg" className="mb-4">
            Додати до кошика
          </Button>
          <Button variant="outline" fullWidth size="lg">
            Порівняти
          </Button>

          {/* Success Alert */}
          {isAdded && (
            <Alert type="success" title="Успіх!" className="mt-4">
              Товар додано до кошика
            </Alert>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Схожі товари</h2>
        <ProductGrid products={mockRelatedProducts} columns={3} />
      </div>
    </MainLayout>
  )
}
