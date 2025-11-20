// // src/components/layout/Header.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';
// import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
// import './Header.css';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const { user, signOut } = useAuth();
//   const { isDark, toggleTheme } = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setHasScrolled(scrollTop > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   const handleLogout = async () => {
//     try {
//       await signOut();
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Menu', href: '/menu' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Reserve', href: '/reservation', isButton: true }
//   ];

//   return (
//     <header className={`navbar ${hasScrolled ? 'navbar-scrolled' : ''} ${isDark ? 'dark' : ''}`}>
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link to="/" className="navbar-logo">
//           <span className="logo-text">Savoré</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="navbar-nav desktop">
//           {navigation.map((item) => (
//             item.isButton ? (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`nav-link nav-button ${location.pathname === item.href ? 'active' : ''}`}
//               >
//                 {item.name}
//               </Link>
//             ) : (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
//               >
//                 {item.name}
//                 <span className="nav-underline"></span>
//               </Link>
//             )
//           ))}
//         </nav>

//         {/* Right Side Actions */}
//         <div className="navbar-actions">
//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="theme-toggle"
//             aria-label="Toggle theme"
//           >
//             {isDark ? <Sun size={20} /> : <Moon size={20} />}
//           </button>

//           {/* Auth Section */}
//           <div className="auth-section">
//             {user ? (
//               <div className="user-menu">
//                 <span className="user-greeting">
//                   <User size={16} />
//                   Hi, {user.email?.split('@')[0]}
//                 </span>
//                 <button onClick={handleLogout} className="logout-btn">
//                   <LogOut size={16} />
//                 </button>
//               </div>
//             ) : (
//               <Link to="/admin" className="login-link">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="mobile-menu-btn"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
//         <nav className="navbar-nav mobile">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               to={item.href}
//               className={`nav-link mobile ${item.isButton ? 'nav-button' : ''} ${location.pathname === item.href ? 'active' : ''}`}
//             >
//               {item.name}
//             </Link>
//           ))}
          
//           {/* Mobile Auth Section */}
//           <div className="mobile-auth">
//             {user ? (
//               <div className="mobile-user">
//                 <User size={18} />
//                 <span>Hi, {user.email?.split('@')[0]}</span>
//                 <button onClick={handleLogout} className="logout-btn mobile">
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link to="/admin" className="login-link mobile">
//                 Login
//               </Link>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div 
//           className="mobile-menu-overlay"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;










// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext'; // Add cart context
import { Menu, X, User, LogOut, Moon, Sun, ShoppingCart } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartItems, isChatbotOpen, toggleChatbot } = useCart(); // Add cart functionality
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Reserve', href: '/reservation', isButton: true }
  ];

  return (
    <header className={`navbar ${hasScrolled ? 'navbar-scrolled' : ''} ${isDark ? 'dark' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Savoré</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop">
          {navigation.map((item) => (
            item.isButton ? (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link nav-button ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
                <span className="nav-underline"></span>
              </Link>
            )
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Cart Icon with Badge */}
          <button 
            className="cart-icon-wrapper"
            onClick={toggleChatbot}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Section */}
          

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="navbar-nav mobile">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link mobile ${item.isButton ? 'nav-button' : ''} ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Cart */}
          <button 
            className="mobile-cart-btn"
            onClick={() => {
              toggleChatbot();
              setIsMenuOpen(false);
            }}
          >
            <ShoppingCart size={20} />
            <span>Cart ({totalItems})</span>
          </button>
          
          {/* Mobile Auth Section */}
          <div className="mobile-auth">
            {user ? (
              <div className="mobile-user">
                <User size={18} />
                <span>Hi, {user.email?.split('@')[0]}</span>
                <button onClick={handleLogout} className="logout-btn mobile">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) :
             (
              <Link to="/admin" className="login-link mobile">
                Login
              </Link>
            )
            }
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;