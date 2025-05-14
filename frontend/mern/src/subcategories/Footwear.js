import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { addToCart as addToCartAction, removecartitem } from '../contexts/Reducer';
import '../css/Footwear.css';

const Footwear = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);


  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);


  useEffect(() => {
    const cartStatus = {};
    cartItems.forEach(item => {
      cartStatus[item.id] = true;
    });
    setAddedToCart(cartStatus);
  }, [cartItems]);

  const footwearItems = [
    {
      id: 1,
      name: 'Running Shoes Pro',
      price: 89.99,
      description: 'Lightweight running shoes with advanced cushioning technology for maximum comfort.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      type: 'sneakers'
    },
    {
      id: 2,
      name: 'Classic Leather Loafers',
      price: 79.99,
      description: 'Premium genuine leather loafers for a sophisticated casual look.',
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      type: 'casual'
    },
    {
      id: 3,
      name: 'Hiking Boots',
      price: 119.99,
      description: 'Waterproof hiking boots with ankle support and rugged outsole for all terrains.',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      type: 'outdoor'
    },
    {
      id: 4,
      name: 'Canvas Sneakers',
      price: 39.99,
      description: 'Breathable canvas sneakers with rubber sole for everyday comfort.',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.3,
      type: 'sneakers'
    },
    {
      id: 5,
      name: 'Formal Oxford Shoes',
      price: 99.99,
      description: 'Elegant oxford shoes made with fine leather for business and formal occasions.',
      image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
      type: 'formal'
    },
    {
      id: 6,
      name: 'Slip-on Sandals',
      price: 29.99,
      description: 'Comfortable slip-on sandals with arch support for warm weather.',
      image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.2,
      type: 'sandals'
    },
    {
      id: 7,
      name: 'Basketball High-Tops',
      price: 109.99,
      description: 'High-performance basketball shoes with ankle support and responsive cushioning.',
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      type: 'sports'
    },
    {
      id: 8,
      name: 'Winter Boots',
      price: 89.99,
      description: 'Insulated winter boots with waterproof exterior and thermal lining.',
      image: 'https://images.unsplash.com/photo-1542816417-0983675a5c7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.4,
      type: 'seasonal'
    }
  ];

const toggleWishlist = (id) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id];
      return newWishlist;
    });
  };

  const handleCartAction = (product) => {
    if (addedToCart[product.id]) {
      dispatch(removecartitem(product.id));
    } else {
      dispatch(addToCartAction(product));
    }
  };

  const getMaterialByType = (type) => {
    switch(type) {
      case 'sneakers': return 'Breathable mesh upper';
      case 'formal': return 'Genuine leather';
      case 'sandals': return 'Synthetic straps';
      case 'outdoor': return 'Waterproof leather';
      default: return 'Premium materials';
    }
  };

  const getClosureByType = (type) => {
    switch(type) {
      case 'sneakers': return 'Lace-up';
      case 'loafers': return 'Slip-on';
      case 'sandals': return 'Adjustable straps';
      default: return 'Varies by style';
    }
  };

  const viewDetails = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        ...product,
        originalPrice: Math.round(product.price * 1.3 * 100) / 100,
        discount: 23,
        reviewsCount: 42,
        brand: 'FootwearBrand',
        sku: `FTWR-${product.id}`,
        stockStatus: 'In Stock',
        features: [
          'Premium materials',
          'Comfortable design',
          'Durable construction'
        ],
        specifications: {
          'Material': getMaterialByType(product.type),
          'Sole': 'High-quality rubber',
          'Closure': getClosureByType(product.type),
          'Origin': 'Imported'
        },
        sizes: ['6', '7', '8', '9', '10', '11']
      }
    });
  };

  return (
    <div className="footwear-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        &larr; Back to Home
      </button>
      
      <h1 className="footwear-header">Our Footwear Collection</h1>
      <p className="footwear-subheader">Step into comfort and style</p>
      
      <div className="footwear-grid">
        {footwearItems.map((item) => (
          <div key={item.id} className="footwear-card">
            <div className="footwear-image-container">
              <img 
                src={item.image} 
                alt={item.name} 
                className="footwear-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Footwear+Image';
                }}
              />
              <span className="footwear-type-badge">{item.type}</span>
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(item.id)}
              >
                {wishlist.includes(item.id)
                  ? <FaHeart className="wishlist-icon filled" />
                  : <FaRegHeart className="wishlist-icon" />}
              </button>
            </div>
            <div className="footwear-details">
              <h3 className="footwear-name">{item.name}</h3>
              <div className="footwear-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(item.rating) ? 'star filled' : 'star'}
                  />
                ))}
                <span className="rating-value">{item.rating}</span>
              </div>
              <div className="price-container">
                <span className="current-price">${item.price.toFixed(2)}</span>
                <span className="original-price">${(item.price * 1.3).toFixed(2)}</span>
                <span className="discount">23% off</span>
              </div>
              <p className="footwear-description">{item.description}</p>
              <div className="footwear-buttons">
                <button
                  className={`add-to-cart-btn ${addedToCart[item.id] ? 'in-cart' : ''}`}
                  onClick={() => handleCartAction(item)}
                >
                  {addedToCart[item.id] ? (
                    'Remove from Cart'
                  ) : (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  className="view-details-btn"
                  onClick={() => viewDetails(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footwear;