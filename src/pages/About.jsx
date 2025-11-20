// src/pages/About.jsx
import React from 'react';
import { Star, Award, Users, Heart, Quote, ChefHat, Utensils, Leaf, Clock } from 'lucide-react';
import './About.css';

const About = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Critic - Taste Magazine',
      content: 'The best dining experience I\'ve had this year. Every dish was a masterpiece that told a story of passion and precision.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Regular Customer',
      content: 'Consistently excellent food and impeccable service. My family\'s go-to spot for celebrating life\'s special moments.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'First-time Visitor',
      content: 'From the warm ambiance to the extraordinary flavors, every detail was perfect. An unforgettable culinary journey!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const stats = [
    { 
      icon: <Users size={32} />, 
      number: '10,000+', 
      label: 'Happy Customers',
      description: 'Served with love and care'
    },
    { 
      icon: <Award size={32} />, 
      number: '15+', 
      label: 'Awards Won',
      description: 'Culinary excellence recognized'
    },
    { 
      icon: <Star size={32} />, 
      number: '4.9', 
      label: 'Average Rating',
      description: 'Across all platforms'
    },
    { 
      icon: <Heart size={32} />, 
      number: '8', 
      label: 'Years Experience',
      description: 'Perfecting our craft'
    }
  ];

  const values = [
    {
      icon: <Leaf size={28} />,
      title: 'Farm to Table',
      description: 'We source ingredients directly from local farms, ensuring peak freshness and supporting our community.'
    },
    {
      icon: <ChefHat size={28} />,
      title: 'Culinary Innovation',
      description: 'Our chefs blend traditional techniques with modern creativity to deliver unforgettable dining experiences.'
    },
    {
      icon: <Utensils size={28} />,
      title: 'Exceptional Service',
      description: 'Every guest is treated like family, with attentive service that anticipates your every need.'
    },
    {
      icon: <Clock size={28} />,
      title: 'Timeless Quality',
      description: 'We maintain the highest standards in every dish, preserving the authenticity of flavors.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Our <span className="title-accent">Culinary</span> Journey
            </h1>
            <p className="hero-subtitle">
              Where passion meets perfection, and every meal tells a story of tradition, innovation, and heartfelt hospitality.
            </p>
            <div className="hero-ornament">
              <div className="ornament-line"></div>
              <ChefHat className="ornament-icon" size={32} />
              <div className="ornament-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <div className="section-header">
                <span className="section-label">Our Story</span>
                <h2 className="section-title">
                  From Humble Beginnings to Culinary Excellence
                </h2>
              </div>
              
              <div className="story-text">
                <p>
                  Founded in 2016 by Chef Marco Romano, Savoré began as a small family-owned restaurant with a simple vision: to create extraordinary dining experiences that bring people together. What started with just twelve tables and a dream has blossomed into a celebrated culinary destination.
                </p>
                <p>
                  Our journey is rooted in the belief that great food is more than just nourishment—it's a celebration of life, love, and community. Every dish that leaves our kitchen carries the legacy of generations of culinary tradition, infused with innovative techniques and a deep respect for ingredients.
                </p>
                <blockquote className="story-quote">
                  <Quote className="quote-icon" size={24} />
                  <p>"Food is the universal language of love. At Savoré, we don't just serve meals—we create memories that linger long after the last bite."</p>
                  <footer className="quote-author">
                    <div className="author-avatar">
                      <span>MR</span>
                    </div>
                    <div className="author-info">
                      <strong>Chef Marco Romano</strong>
                      <span>Founder & Head Chef</span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            
            <div className="story-visual">
              <div className="image-grid">
                <div className="image-main">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=600&fit=crop" 
                    alt="Restaurant interior"
                    className="story-image"
                  />
                </div>
                <div className="image-secondary">
                  <img 
                    src="https://images.unsplash.com/photo-1586999768265-24af89630739?w=300&h=400&fit=crop" 
                    alt="Chef preparing food"
                    className="story-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">The Pillars of Our Excellence</h2>
            <p className="section-subtitle">
              These core principles guide everything we do, from selecting ingredients to crafting your dining experience.
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Voices of Our Guests</h2>
            <p className="section-subtitle">
              Discover what makes Savoré more than just a restaurant through the experiences of our valued guests.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="star-icon"
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                
                <blockquote className="testimonial-content">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience Savoré?</h2>
            <p className="cta-subtitle">
              Join us for an unforgettable culinary journey where every moment is crafted with passion and precision.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Reserve Your Table</button>
              <button className="btn btn-secondary">View Our Menu</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;