// Order types
export interface OrderItem {
  productId: string
  product: {
    id: string
    name: string
    image: string
    price: number
  }
  quantity: number
  size: string
  color: string
  pricePerUnit: number
}

export interface ShippingAddress {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault?: boolean
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  status: OrderStatus
  paymentMethod: string
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

export interface CheckoutData {
  items: OrderItem[]
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  shippingMethod: string
  paymentMethod: string
  promoCode?: string
}
