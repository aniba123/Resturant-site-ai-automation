// src/pages/Contact.jsx
import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Navigation } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Contact form submission:', formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessageSent(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "923216579025"
    const message = "Hello! I'd like to get in touch with your restaurant."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Our Location',
      details: ['Savoré Restaurant', 'Gulberg Lahore, '],
      color: 'text-red-500'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone Number',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'text-blue-500'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Address',
      details: ['info@savory.com', 'reservations@savory.com'],
      color: 'text-green-500'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Working Hours',
      details: ['Mon-Fri: 11:00 AM - 10:00 PM', 'Sat-Sun: 10:00 AM - 11:00 PM'],
      color: 'text-purple-500'
    }
  ]

  if (messageSent) {
    return (
      <div className="min-h-screen flex items-center justify-center success-container contact-dark:bg-success-dark">
        <div className="text-center p-8 rounded-2xl bg-white contact-dark:bg-gray-800 shadow-2xl mx-4">
          <div className="w-20 h-20 bg-green-100 contact-dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 contact-dark:text-white mb-4">
            Message Sent!
          </h1>
          <p className="text-xl text-gray-600 contact-dark:text-gray-300 mb-8 max-w-md">
            Thank you for reaching out! We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setMessageSent(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-container contact-dark">
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <div className="whatsapp-tooltip">
          Chat with us on WhatsApp!
        </div>
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="contact-header rounded-2xl text-center mb-16 p-12 mx-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 contact-dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 contact-dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="contact-card rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 contact-dark:text-white mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600 contact-dark:text-gray-300 mb-8">
                Multiple ways to connect with us
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item p-4 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className={`${info.color} bg-opacity-10 p-3 rounded-lg`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 contact-dark:text-white text-lg mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 contact-dark:text-gray-300 text-sm mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="contact-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 contact-dark:text-white mb-4 flex items-center">
                <Navigation className="w-6 h-6 mr-2 text-orange-500" />
                Find Our Location
              </h3>
              <div className="map-container h-64 rounded-xl flex items-center justify-center">
                <div className="map-overlay"></div>
                <div className="text-center relative z-10">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                  <p className="text-gray-700 contact-dark:text-gray-300 font-semibold text-lg">
                    Visit Our Restaurant
                  </p>
                  <p className="text-gray-600 contact-dark:text-gray-400">
                   DHA , Phase 6 , Lahore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 contact-dark:text-white mb-2">
              Send Message
            </h2>
            <p className="text-gray-600 contact-dark:text-gray-300 mb-8">
              Fill out the form below and we'll respond promptly
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 contact-dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-form-input w-full px-4 py-3 border border-gray-300 contact-dark:border-gray-600 rounded-xl focus:outline-none contact-dark:text-white transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 contact-dark:text-gray-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-form-input w-full px-4 py-3 border border-gray-300 contact-dark:border-gray-600 rounded-xl focus:outline-none contact-dark:text-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 contact-dark:text-gray-300">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-form-input w-full px-4 py-3 border border-gray-300 contact-dark:border-gray-600 rounded-xl focus:outline-none contact-dark:text-white transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 contact-dark:text-gray-300">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="contact-form-input w-full px-4 py-3 border border-gray-300 contact-dark:border-gray-600 rounded-xl focus:outline-none contact-dark:text-white transition-all resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-button w-full text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner w-5 h-5 mr-3"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2" size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact