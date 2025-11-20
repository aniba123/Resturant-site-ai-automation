// src/pages/Order.jsx
import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { supabase } from '../config/supabase'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

const Order = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customerInfo.name,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone,
            customer_address: customerInfo.address,
            items: items,
            total: total,
            status: 'pending'
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Clear cart and show success
      clearCart()
      setOrderPlaced(true)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thank you for your order. We'll contact you soon with updates.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Place Your Order
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>
            
            {items.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-orange-500 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <button
                type="submit"
                disabled={items.length === 0 || loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order