
// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Reservation from './pages/Reservation'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Chatbot from './components/Chatbot/Chatbot'
import OrderForm from './pages/OrderForm'
import ChatWidget from './pages/ChatWidget';


import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Order />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Layout>
            {/* Global Components */}
            <Chatbot />
            <OrderForm />
          </Router>
        </CartProvider>
         <ChatWidget /> 
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App