
// src/components/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, Loader, Utensils, MapPin, Phone, User, Mail } from 'lucide-react';
import './OrderForm.css';

const OrderForm = () => {
  const { cartItems, isChatbotOpen, toggleChatbot, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    orderDetails: ''
  });

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Initialize order details when cart changes
  useEffect(() => {
    const orderDetails = cartItems.map(item => 
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    setFormData(prev => ({
      ...prev,
      orderDetails: orderDetails + `\n\nTotal: $${totalPrice.toFixed(2)}`
    }));
  }, [cartItems, totalPrice]);

  // Reset form after success
  useEffect(() => {
    let timeoutId;
    
    if (isSuccess) {
      // Auto-reset after 5 seconds
      timeoutId = setTimeout(() => {
        resetForm();
      }, 5000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      orderDetails: ''
    });
    clearCart();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to n8n webhook
      const response = await fetch('http://localhost:5678/webhook/get-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: totalPrice,
          items: cartItems,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // Show success state
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Reset form when closing
      if (isSuccess) {
        resetForm();
      }
      toggleChatbot();
    }
  };

  // Manual reset function for the success popup
  const handleSuccessClose = () => {
    resetForm();
  };

  if (!isChatbotOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="order-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="order-form-container"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="form-header">
            <div className="header-content">
              <Utensils className="header-icon" size={24} />
              <h2>Complete Your Order</h2>
            </div>
            <button 
              className="close-btn"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <X size={20} />
            </button>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                className="success-message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <CheckCircle className="success-icon" size={48} />
                <h3>Thank you! Your order has been placed successfully 🍔</h3>
                <p>You will receive a confirmation email shortly.</p>
                <button 
                  className="success-close-btn"
                  onClick={handleSuccessClose}
                >
                  Place Another Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order Form */}
          {!isSuccess && (
            <motion.form
              className="order-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="summary-item">
                      <span className="item-name">{item.quantity}x {item.name}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span id='total'>Total:</span>
                  <span className="total-price">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-fields">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Delivery Address */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    <MapPin size={16} />
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                {/* Order Details */}
                <div className="form-group">
                  <label htmlFor="orderDetails" className="form-label">
                    Order Details
                  </label>
                  <textarea
                    id="orderDetails"
                    name="orderDetails"
                    value={formData.orderDetails}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows="6"
                    readOnly
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || cartItems.length === 0}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="spinner" size={20} />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Submit Order - ${totalPrice.toFixed(2)}
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderForm;