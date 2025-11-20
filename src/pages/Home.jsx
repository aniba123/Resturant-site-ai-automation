// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users, ChefHat, Award, Heart, Utensils, MapPin, Phone, Mail } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <ChefHat size={32} />,
      title: 'Expert Chefs',
      description: 'Our Michelin-trained chefs craft each dish with precision and passion',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Utensils size={32} />,
      title: 'Fresh Ingredients',
      description: 'Locally sourced, organic ingredients for the purest flavors',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Award size={32} />,
      title: 'Award Winning',
      description: 'Recognized for culinary excellence and exceptional service',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <Heart size={32} />,
      title: 'Made with Love',
      description: 'Every dish tells a story of tradition and heartfelt care',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const specialties = [
    {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      title: 'Seasonal Starters',
      description: 'Fresh appetizers that celebrate the best of each season',
      price: '$12-18'
    },
    {
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      title: 'Signature Mains',
      description: 'Expertly crafted entrees that define culinary excellence',
      price: '$24-38'
    },
    {
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
      title: 'Artisan Desserts',
      description: 'Sweet creations that provide the perfect finale',
      price: '$10-14'
    }
  ];

  const stats = [
    { number: '8+', label: 'Years of Excellence' },
    { number: '15k+', label: 'Happy Customers' },
    { number: '4.9', label: 'Star Rating' },
    { number: '50+', label: 'Award Wins' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-video">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop" 
              alt="Restaurant ambiance"
              className="hero-bg-image"
            />
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Star className="badge-icon" size={16} />
              <span>Exquisite Dining Since 2016</span>
            </div>
            
            <h1 className="hero-title">
              Welcome to <span className="title-accent">Savoré</span>
            </h1>
            
            <p className="hero-subtitle">
              Where culinary artistry meets warm hospitality. Experience the perfect blend of 
              traditional flavors and innovative techniques in an atmosphere designed for memorable moments.
            </p>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="hero-actions">
              <Link to="/reservation" className="btn btn-primary">
                <span>Reserve Your Table</span>
                <ArrowRight className="btn-icon" size={20} />
              </Link>
              <Link to="/menu" className="btn btn-secondary">
                Explore Our Menu
              </Link>
            </div>
          </div>
          
         
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Why Choose Savoré</span>
            <h2 className="section-title">The Art of Exceptional Dining</h2>
            <p className="section-subtitle">
              Discover what sets us apart and makes every visit an unforgettable experience
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.gradient}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="specialties-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Specialties</span>
            <h2 className="section-title">Culinary Masterpieces</h2>
            <p className="section-subtitle">
              Explore our signature dishes that have earned us recognition and praise
            </p>
          </div>
          
          <div className="specialties-grid">
            {specialties.map((specialty, index) => (
              <div key={index} className="specialty-card">
                <div className="card-image">
                  <img 
                    src={specialty.image} 
                    alt={specialty.title}
                    className="specialty-image"
                  />
                  <div className="card-overlay">
                    <span className="price-tag">{specialty.price}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="specialty-title">{specialty.title}</h3>
                  <p className="specialty-description">{specialty.description}</p>
                  <Link to="/menu" className="specialty-link">
                    View Selection
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-overlay"></div>
          <img 
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&h=600&fit=crop" 
            alt="Fine dining experience"
            className="cta-bg-image"
          />
        </div>
        
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">Ready for an Unforgettable Experience?</h2>
              <p className="cta-subtitle">
                Join us at Savoré and discover why we're the preferred choice for 
                discerning diners seeking exceptional cuisine and impeccable service.
              </p>
              
              <div className="cta-features">
                <div className="cta-feature">
                  <Clock size={20} />
                  <span>Open Tuesday - Sunday, 5 PM - 11 PM</span>
                </div>
                <div className="cta-feature">
                  <MapPin size={20} />
                  <span>123 Gourmet Avenue, Culinary District</span>
                </div>
                <div className="cta-feature">
                  <Phone size={20} />
                  <span>Reservations: (555) 123-SAVORE</span>
                </div>
              </div>
            </div>
            
            <div className="cta-actions">
              <Link to="/reservation" className="btn btn-primary large">
                <span>Book Your Table Now</span>
                <ArrowRight className="btn-icon" size={20} />
              </Link>
              <Link to="/contact" className="btn btn-secondary large">
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <div className="footer-cta-content">
            <div className="cta-info">
              <h3 className="cta-info-title">Follow Our Journey</h3>
              <p className="cta-info-subtitle">
                Stay updated with our latest creations, seasonal menus, and special events
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/menu" className="btn btn-outline">
                View Full Menu
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;