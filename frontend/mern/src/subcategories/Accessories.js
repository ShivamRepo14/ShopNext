import React, { useEffect } from 'react';
import '../css/Accessories.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, removecartitem } from '../contexts/Reducer'; 

const Accessories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.items);

  const accessories = [
    {
      id: 1,
      name: 'Wireless Bluetooth Earbuds',
      price: 59.99,
      description: 'Premium sound quality with 20hr battery life. Noise cancellation feature included.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 129.99,
      description: 'Track your fitness, receive notifications, and monitor heart rate with this sleek smartwatch.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Leather Wallet',
      price: 34.99,
      description: 'Genuine leather wallet with multiple card slots and RFID protection.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.3
    },
    {
      id: 4,
      name: 'Sunglasses Classic',
      price: 45.99,
      description: 'UV protection sunglasses with polarized lenses for optimal eye comfort.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Backpack Urban',
      price: 49.99,
      description: 'Durable water-resistant backpack with laptop compartment and multiple pockets.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Wireless Charger Pad',
      price: 24.99,
      description: 'Fast charging wireless pad compatible with Qi-enabled devices.',
      image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.2
    },
    {
      id: 7,
      name: 'Stainless Steel Water Bottle',
      price: 19.99,
      description: 'Keep your drinks hot or cold for hours with this insulated stainless steel bottle.',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8
    },
    {
      id: 8,
      name: 'Phone Holder Stand',
      price: 12.99,
      description: 'Adjustable stand for phones and tablets, perfect for watching videos or video calls.',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.1
    }
  ];

  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  const handleCartToggle = (item) => {
    if (isInCart(item.id)) {
      dispatch(removecartitem(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="accessories-container">
      <button onClick={() => navigate('/')} className="back-button">
        &larr; Back
      </button>
      <h1 className="accessories-header">Featured Accessories</h1>
      <p className="accessories-subheader">Discover our collection of premium accessories</p>

      <div className="accessories-grid">
        {accessories.map((item) => (
          <div key={item.id} className="accessory-card">
            <div className="accessory-image-container">
              <img
                src={item.image}
                alt={item.name}
                className="accessory-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Accessory+Image';
                }}
              />
            </div>
            <div className="accessory-details">
              <h3 className="accessory-name">{item.name}</h3>
              <div className="accessory-rating">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < Math.floor(item.rating) ? 'filled' : ''}`}
                  >
                    {i < Math.floor(item.rating) ? '★' : '☆'}
                  </span>
                ))}
                <span className="rating-value">{item.rating}</span>
              </div>
              <p className="accessory-description">{item.description}</p>
              <div className="accessory-price-container">
                <span className="accessory-price">${item.price.toFixed(2)}</span>
                <div className="accessory-buttons">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleCartToggle(item)}
                  >
                    {isInCart(item.id) ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/accessory/${item.id}`, { state: item })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
