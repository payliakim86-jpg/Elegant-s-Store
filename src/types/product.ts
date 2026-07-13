// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  category: string
  subcategory?: string
  images: string[]
  mainImage: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  material: string
  rating: number
  reviewCount: number
  stock: number
  createdAt: string
  updatedAt: string
}

export interface ProductFilter {
  category?: string
  subcategory?: string
  priceMin?: number
  priceMax?: number
  sizes?: string[]
  colors?: string[]
  rating?: number
  inStock?: boolean
}

export interface ProductSort {
  field: 'price' | 'rating' | 'createdAt' | 'name'
  order: 'asc' | 'desc'
}
