"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { MenuItem } from "@/lib/types"

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (menuItem: MenuItem, quantity?: number) => void
  removeItem: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (menuItemId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (menuItem: MenuItem, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menuItem.id === menuItem.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prevItems, { menuItem, quantity }]
    })
  }

  const removeItem = (menuItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== menuItemId))
  }

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.menuItem.id === menuItemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0)
  }

  const getItemQuantity = (menuItemId: string) => {
    const item = items.find((item) => item.menuItem.id === menuItemId)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
