'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem, Cart, CartContextType } from '@/types/cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'addedAt'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }

const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
  lastUpdated: new Date().toISOString(),
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          itemCount: state.itemCount + action.payload.quantity,
          lastUpdated: new Date().toISOString(),
        }
      }

      const newItem: CartItem = {
        ...action.payload,
        id: `${action.payload.productId}-${Date.now()}`,
        addedAt: new Date().toISOString(),
      }

      return {
        ...state,
        items: [...state.items, newItem],
        itemCount: state.itemCount + action.payload.quantity,
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        itemCount: Math.max(0, state.itemCount - (itemToRemove?.quantity || 0)),
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      if (quantity <= 0) {
        const itemToRemove = state.items.find((item) => item.id === itemId)
        return {
          ...state,
          items: state.items.filter((item) => item.id !== itemId),
          itemCount: Math.max(0, state.itemCount - (itemToRemove?.quantity || 0)),
          lastUpdated: new Date().toISOString(),
        }
      }

      const itemToUpdate = state.items.find((item) => item.id === itemId)
      const quantityDiff = quantity - (itemToUpdate?.quantity || 0)

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
        itemCount: state.itemCount + quantityDiff,
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'CLEAR_CART':
      return {
        ...initialCart,
        lastUpdated: new Date().toISOString(),
      }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('elegant-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('elegant-cart', JSON.stringify(cart))
  }, [cart])

  const addItem = (item: Omit<CartItem, 'id' | 'addedAt'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price
      return total + price * item.quantity
    }, 0)
  }

  const value: CartContextType = {
    cart: {
      ...cart,
      total: getTotal(),
    },
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
