import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeart,  FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import '../css/ProductDetail.css';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="product-detail-container">No product data found.</div>;
  }

  const { 
    name = 'Product Name',
    price = 0,
    originalPrice = null,
    discount = 0,
    description = 'No description available',
    image = '', 
    rating = 0, 
    reviewsCount = 0,
    brand = 'Unknown Brand',
    sku = 'N/A',
    stockStatus = 'In Stock',
    features = [], 
    specifications = {}, 
    sizes = []
  } = state;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <div className="product-card">
        <div className="product-gallery">
          <div className="badge-container">
            <span className="product-badge badge-new">New</span>
            <span className="product-badge badge-bestseller">Bestseller</span>
          </div>
          <img src={image || 'https://via.placeholder.com/400'} alt={name} className="main-image" />
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{name}</h1>
          <p className="product-sku">SKU: {sku} | Brand: {brand}</p>
          
          <div className="price-container">
            <span className="current-price">${price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="original-price">${originalPrice.toFixed(2)}</span>
                <span className="discount-badge">{discount}% off</span>
              </>
            )}
          </div>
          
          <div className="stock-status">
            {stockStatus === 'In Stock' ? (
              <span className="in-stock">✓ In Stock</span>
            ) : (
              <span className="low-stock">! Only 3 left</span>
            )}
          </div>
          
          <div className="rating-container">
            <span className="rating">⭐ {rating}</span>
            <span className="reviews-count">{reviewsCount} reviews</span>
          </div>
          
          <p className="product-description">{description}</p>
          
          {sizes.length > 0 && (
            <div className="size-selector">
              <p className="variant-title">Available Sizes</p>
              <div className="variant-options">
                {sizes.map((size, index) => (
                  <div key={index} className="variant-option">
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {features.length > 0 && (
            <div className="features-section">
              <h3>Key Features:</h3>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {Object.keys(specifications).length > 0 && (
            <div className="specs-section">
              <h3>Specifications:</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specifications).map(([key, value], index) => (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="social-share">
            <span>Share:</span>
            <div className="social-icon">
              <FaFacebook />
            </div>
            <div className="social-icon">
              <FaTwitter />
            </div>
            <div className="social-icon">
              <FaPinterest />
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="buy-btn">Buy Now</button>
            <button className="wishlist-btn">
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;