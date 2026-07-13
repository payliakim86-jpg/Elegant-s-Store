// Cart types
export interface CartItem {
  id: string
  productId: string
  product: {
    id: string
    name: string
    image: string
    price: number
    discountedPrice?: number
  }
  quantity: number
  size: string
  color: string
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
  lastUpdated: string
}

export interface CartContextType {
  cart: Cart
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}
