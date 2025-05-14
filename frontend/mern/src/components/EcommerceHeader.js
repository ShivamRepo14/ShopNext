import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

const EcommerceHeader = ({ cart = [], searchTerm, setSearchTerm }) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className={`ecommerce-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img
            src="https://i.postimg.cc/fJDfCVPG/Screenshot-13-5-2025-143438-logo-com.jpg"
            alt="ShopNest"
            className="logo-img"
          />
          <span className="logo-text"><i>Shop-n</i></span>
        </div>

        {windowWidth > 768 && (
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products , brands and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // update searchTerm
              />
            </div>
          </div>
          
        )}

        {windowWidth <= 768 && isMobileSearchOpen && (
          <div className="mobile-inline-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // update searchTerm
              autoFocus
            />
            <FaTimes className="close-icon" onClick={() => setIsMobileSearchOpen(false)} />
          </div>
        )}

        <div className="header-actions">
          {windowWidth <= 768 && !isMobileSearchOpen && (
            <button
              className="search-toggle"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
            >
              <FaSearch />
            </button>
          )}

          <button
            className="cart-btn"
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          >
            <FaShoppingCart className="icon" />
            {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default EcommerceHeader;
