
// src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Star, Clock, ChefHat } from 'lucide-react';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('clean_menu') // FIXED: correct table
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // FIXED: Use clean_category from VIEW
      setMenuItems(data);

      // FIXED: categories built from clean_category
      const uniqueCategories = [
        'all',
        ...new Set(data.map((item) => item.clean_category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      setError(`Failed to load menu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Filtering using clean_category
  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.clean_category === activeCategory);

  // FIXED: Category items using clean_category
  const getCategoryItems = (category) => {
    return menuItems.filter((item) => item.clean_category === category);
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <div className="loading-spinner"></div>
        <p>Loading our delicious menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-error">
        <div className="error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchMenuItems} className="retry-btn">
              Try Again
            </button>
            <button onClick={() => setError(null)} className="back-btn">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">

      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-content">
          <ChefHat className="hero-icon" size={48} />
          <h1 className="menu-title">Our Culinary Journey</h1>
          <p className="menu-subtitle">
            Experience the artistry of flavors crafted with passion and the finest ingredients
          </p>
          <div className="hero-features">
            <div className="feature">
              <Star className="feature-icon" size={20} />
              <span>Fresh Ingredients</span>
            </div>
            <div className="feature">
              <Clock className="feature-icon" size={20} />
              <span>Made to Order</span>
            </div>
            <div className="feature">
              <ChefHat className="feature-icon" size={20} />
              <span>Expert Chefs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="container">

          {/* Category Navigation */}
          <nav className="category-nav">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              >
                <span className="btn-text">
                  {category === 'all' ? 'All Menu' : category}
                </span>
                <span className="btn-underline"></span>
              </button>
            ))}
          </nav>

          {/* Menu Items Grid */}
          <div className="menu-grid-container">
            {activeCategory === 'all' ? (
              categories
                .filter((cat) => cat !== 'all')
                .map((category) => (
                  <section key={category} className="category-section">
                    <div className="category-header">
                      <h2 className="category-title">{category}</h2>
                      <div className="category-decoration">
                        <div className="decoration-line"></div>
                        <ChefHat size={24} />
                        <div className="decoration-line"></div>
                      </div>
                    </div>
                    <div className="menu-grid">
                      {getCategoryItems(category).map((item) => (
                        <MenuItemCard key={item.id} item={item} onAddToCart={addItem} />
                      ))}
                    </div>
                  </section>
                ))
            ) : (
              <div className="menu-grid">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={addItem} />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

const MenuItemCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image_url,
        description: item.description,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setQuantity(1);
    setIsAdding(false);
  };

  const isAvailable = item.is_available !== false;

  return (
    <div className={`menu-item-card ${!isAvailable ? 'unavailable' : ''}`}>
      <div className="card-image-container">
        <img
          src={item.image_url}
          alt={item.name}
          className="card-image"
          loading="lazy"
        />

        <div className="card-overlay">
          <span className="price-tag">
            ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
          </span>

          {!isAvailable && <span className="unavailable-badge">Unavailable</span>}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="item-name">{item.name}</h3>

          {/* FIXED: showing clean category */}
          <span className="item-category">{item.clean_category}</span>
        </div>

        <p className="item-description">{item.description}</p>

        <div className="card-actions">
          <div className="quantity-controls">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="quantity-btn"
              disabled={quantity === 1 || !isAvailable}
            >
              <Minus size={16} />
            </button>

            <span className="quantity-display">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="quantity-btn"
              disabled={!isAvailable}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${
              !isAvailable ? 'disabled' : ''
            }`}
            disabled={isAdding || !isAvailable}
          >
            {!isAvailable
              ? 'Unavailable'
              : isAdding
              ? 'Adding...'
              : `Add ${quantity > 1 ? `${quantity} × ` : ''}to Cart`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
