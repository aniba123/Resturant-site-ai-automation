// src/components/layout/Footer.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react'
import './footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Simulate subscription
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <Link to="/" className="brand-logo">
              <div className="logo-icon">S</div>
              <span className="brand-name">Savory</span>
            </Link>
            <p className="brand-description">
              Experience culinary excellence with our handcrafted dishes made from 
              the finest locally-sourced ingredients. Where every meal tells a story.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/menu" className="footer-link">Our Menu</Link></li>
              <li><Link to="/order" className="footer-link">Order Online</Link></li>
              <li><Link to="/reservation" className="footer-link">Make Reservation</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Restaurant Street<br />Food City, FC 12345</span>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567<br />+1 (555) 987-6543</span>
              </li>
              <li className="contact-item">
                <Mail className="contact-icon" />
                <span>info@savory.com<br />reservations@savory.com</span>
              </li>
            </ul>
          </div>

          {/* Hours & Newsletter */}
          <div className="footer-section">
            <h3>Opening Hours</h3>
            <ul className="hours-list">
              <li className="hours-item">Monday - Friday: 11:00 AM - 10:00 PM</li>
              <li className="hours-item">Saturday: 10:00 AM - 11:00 PM</li>
              <li className="hours-item">Sunday: 10:00 AM - 9:00 PM</li>
            </ul>
            
            <div className="newsletter">
              <h3 style={{marginTop: '25px'}}>Newsletter</h3>
              <p className="newsletter-text">
                Subscribe to get updates on special offers and events.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; 2024 Savory Restaurant. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="bottom-link">Terms of Service</Link>
            <Link to="/cookies" className="bottom-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer