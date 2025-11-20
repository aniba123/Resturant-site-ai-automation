

// src/pages/Reservation.jsx
import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { Clock, Users, CheckCircle, Star } from 'lucide-react'
import './reservation.css'

const Reservation = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    reservation_date: '',
    reservation_time: '',
    party_size: 2,
    special_requests: ''
  })
  const [loading, setLoading] = useState(false)
  const [reservationSuccess, setReservationSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, send to Supabase
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            ...formData,
            status: 'pending'
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Then send to n8n webhook
      const webhookData = {
        full_name: formData.customer_name,
        email_address: formData.customer_email,
        phone_number: formData.customer_phone,
        number_of_guests: formData.party_size,
        reservation_date: formData.reservation_date,
        preferred_time: formData.reservation_time,
        special_requests: formData.special_requests
      }

      const webhookResponse = await fetch('http://localhost:5678/webhook-test/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      })

      if (!webhookResponse.ok) {
        throw new Error('Webhook request failed')
      }

      // Show success alert
      alert('Reservation Successful!')
      
      setReservationSuccess(true)
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        reservation_date: '',
        reservation_time: '',
        party_size: 2,
        special_requests: ''
      })
    } catch (error) {
      console.error('Error creating reservation:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const features = [
    {
      icon: <Clock className="feature-svg" />,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation via email"
    },
    {
      icon: <Users className="feature-svg" />,
      title: "Flexible Groups",
      description: "Perfect for parties of any size"
    },
    {
      icon: <Star className="feature-svg" />,
      title: "Premium Service",
      description: "Dedicated tables with personalized attention"
    }
  ]

  if (reservationSuccess) {
    return (
      <div className="reservation-page dark-mode">
        <div className="success-page">
          <div className="success-card">
            <div className="success-icon">
              <CheckCircle />
            </div>
            <h1 className="success-title">Reservation Confirmed!</h1>
            <p className="success-message">Your table has been successfully booked</p>
            <p className="success-submessage">We've sent a confirmation to your email address</p>
            <button
              onClick={() => setReservationSuccess(false)}
              className="submit-button"
              style={{background: 'linear-gradient(135deg, #28a745, #20c997)'}}
            >
              Book Another Table
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reservation-page dark-mode">
      <div className="reservation-container">
        {/* Header */}
        <div className="reservation-header">
          <h1 className="reservation-title">Make a Reservation</h1>
          <p className="reservation-subtitle">
            Secure your spot for an exceptional dining experience. 
            Book your table in just a few simple steps.
          </p>
        </div>

        {/* Features */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Reservation Form */}
        <div className="reservation-form-card">
          <div className="form-header">
            <h2 className="form-title">Book Your Table</h2>
            <p className="form-subtitle">Please provide your details and preferred time</p>
          </div>

          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              {/* Name */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="form-input-wrapper">
                  {/* <User className="form-icon" /> */}
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="form-input-wrapper">
                  {/* <Mail className="form-icon" /> */}
                  <input
                    type="email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div className="form-input-wrapper">
                  {/* <Phone className="form-icon" /> */}
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Party Size */}
              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <div className="form-input-wrapper">
                  <input
                    type="number"
                    name="party_size"
                    required
                    min="1"
                    value={formData.party_size}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter number of guests"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Reservation Date *</label>
                <div className="form-input-wrapper">
                  {/* <Calendar className="form-icon" /> */}
                  <input
                    type="date"
                    name="reservation_date"
                    required
                    value={formData.reservation_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="form-group">
                <label className="form-label">Preferred Time *</label>
                <div className="form-input-wrapper">
                  <input
                    type="text"
                    name="reservation_time"
                    required
                    value={formData.reservation_time}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 7 PM, 8:30, 19:00"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="form-group">
              <label className="form-label">Special Requests</label>
              <textarea
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Any special occasions, dietary requirements, or preferences you'd like us to know about..."
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              ) : (
                'Confirm Reservation'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reservation