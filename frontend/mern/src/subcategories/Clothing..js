import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { addToCart as addToCartAction, removecartitem } from '../contexts/Reducer';
import '../css/Clothing.css';

const Clothing = () => {
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

  const clothingItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 24.99,
      description: '100% cotton premium tee with a comfortable fit. Perfect for everyday wear.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      category: 'tops',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 59.99,
      description: 'Stretch denim jeans with modern slim fit. Comfortable and stylish.',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      category: 'bottoms',
      sizes: ['28', '30', '32', '34']
    },
    {
      id: 3,
      name: 'Oversized Hoodie',
      price: 49.99,
      description: 'Cozy fleece hoodie with kangaroo pocket. Perfect for casual outings.',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      category: 'sweatshirts',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'Tailored Blazer',
      price: 129.99,
      description: 'Professional blazer with notched lapels. Perfect for business or formal occasions.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
      category: 'outerwear',
      sizes: ['38', '40', '42', '44']
    },
    {
      id: 5,
      name: 'Summer Dress',
      price: 45.99,
      description: 'Lightweight floral dress with comfortable fit. Ideal for warm weather.',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.4,
      category: 'dresses',
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 6,
      name: 'Athletic Shorts',
      price: 29.99,
      description: 'Breathable quick-dry shorts with elastic waistband. Great for workouts.',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.3,
      category: 'activewear',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 7,
      name: 'Cashmere Sweater',
      price: 89.99,
      description: 'Luxurious 100% cashmere sweater with ribbed trim. Soft and warm.',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9,
      category: 'knitwear',
      sizes: ['S', 'M', 'L']
    },
    {
      id: 8,
      name: 'Denim Jacket',
      price: 69.99,
      description: 'Classic denim jacket with button front. Timeless layering piece.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      category: 'outerwear',
      sizes: ['S', 'M', 'L', 'XL']
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

  const viewDetails = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        ...product,
        originalPrice: product.price * 1.4,
        discount: 28,
        reviewsCount: 56,
        brand: 'FashionBrand',
        sku: `CLTH-${product.id}`,
        stockStatus: 'In Stock',
        features: [
          'Premium quality fabric',
          'Comfortable fit',
          'Easy care'
        ],
        specifications: {
          'Material': product.category.includes('Cashmere') ? '100% Cashmere' : 'Premium Cotton',
          'Care Instructions': 'Machine wash cold',
          'Fit': 'Regular fit',
          'Origin': 'Imported'
        }
      }
    });
  };

  return (
    <div className="clothing-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        &larr; Back to Home
      </button>
      
      <h1 className="clothing-header">Our Clothing Collection</h1>
      <p className="clothing-subheader">Discover styles for every occasion</p>
      
      <div className="clothing-grid">
        {clothingItems.map((item) => (
          <div key={item.id} className="clothing-card">
            <div className="clothing-image-container">
              <img 
                src={item.image} 
                alt={item.name} 
                className="clothing-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Clothing+Image';
                }}
              />
              <span className="clothing-category-badge">{item.category}</span>
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(item.id)}
              >
                {wishlist.includes(item.id)
                  ? <FaHeart className="wishlist-icon filled" />
                  : <FaRegHeart className="wishlist-icon" />}
              </button>
            </div>
            <div className="clothing-details">
              <h3 className="clothing-name">{item.name}</h3>
              <div className="clothing-rating">
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
                <span className="original-price">${(item.price * 1.4).toFixed(2)}</span>
                <span className="discount">28% off</span>
              </div>
              <div className="size-selector">
                <span className="size-label">Sizes:</span>
                <div className="size-options">
                  {item.sizes.map(size => (
                    <span key={size} className="size-option">{size}</span>
                  ))}
                </div>
              </div>
              <p className="clothing-description">{item.description}</p>
              <div className="clothing-buttons">
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

export default Clothing;