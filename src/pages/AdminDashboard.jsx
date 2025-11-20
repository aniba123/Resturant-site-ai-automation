// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { useAuth } from '../context/AuthContext'
import { LogOut, Users, ShoppingBag, Calendar, Plus, Edit, Trash2 } from 'lucide-react'

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    setupRealtimeSubscription()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      if (activeTab === 'orders') {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        setOrders(data || [])
      } else if (activeTab === 'reservations') {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        setReservations(data || [])
      } else if (activeTab === 'menu') {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category')
          .order('name')
        if (error) throw error
        setMenuItems(data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const setupRealtimeSubscription = () => {
    const tables = {
      'orders': 'orders',
      'reservations': 'reservations',
      'menu': 'menu_items'
    }

    const table = tables[activeTab]
    if (!table) return

    const subscription = supabase
      .channel('admin-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: table },
        () => {
          fetchData()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating reservation status:', error)
      alert('Failed to update reservation status')
    }
  }

  const tabs = [
    { id: 'orders', name: 'Orders', icon: <ShoppingBag size={20} />, count: orders.length },
    { id: 'reservations', name: 'Reservations', icon: <Calendar size={20} />, count: reservations.length },
    { id: 'menu', name: 'Menu', icon: <Users size={20} />, count: menuItems.length }
  ]

  if (loading && orders.length === 0 && reservations.length === 0 && menuItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {user?.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Orders
                </h2>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {order.customer_name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {order.customer_email} • {order.customer_phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-500">
                          ${order.total}
                        </p>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {order.customer_address}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Reservations
                </h2>
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {reservation.customer_name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {reservation.customer_email} • {reservation.customer_phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-500">
                          {reservation.party_size} people
                        </p>
                        <select
                          value={reservation.status}
                          onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {reservation.reservation_date} at {reservation.reservation_time}
                      {reservation.special_requests && ` • ${reservation.special_requests}`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Menu Items
                  </h2>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-orange-500 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {item.category}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard