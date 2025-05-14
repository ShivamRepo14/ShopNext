import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { addToCart as addToCartAction, removecartitem } from '../contexts/Reducer';
import '../css/Handbags.css';

const Handbags = () => {
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

  const handbags = [
    {
      id: 1,
      name: 'Leather Tote Bag',
      price: 149.99,
      description: 'Premium genuine leather tote with spacious interior and sturdy handles. Perfect for work or travel.',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      type: 'tote',
      colors: ['Black', 'Tan', 'Chestnut']
    },
    {
      id: 2,
      name: 'Crossbody Saddle Bag',
      price: 89.99,
      description: 'Trendy crossbody bag with adjustable strap and multiple compartments. Fits all essentials comfortably.',
      image: 'https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
      type: 'crossbody',
      colors: ['Beige', 'Brown', 'Navy']
    },
    {
      id: 3,
      name: 'Designer Shoulder Bag',
      price: 199.99,
      description: 'Luxury shoulder bag with gold-tone hardware and soft quilted leather. Timeless elegance.',
      image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhbmRiYWdzfGVufDB8fDB8fHww',
      rating: 4.9,
      type: 'shoulder',
      colors: ['Black', 'White']
    },
    {
      id: 4,
      name: 'Mini Backpack Purse',
      price: 79.99,
      description: 'Chic mini backpack with leather straps and compact design. Hands-free convenience with style.',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      type: 'backpack',
      colors: ['Pink', 'Black', 'Gray']
    },
    {
      id: 5,
      name: 'Evening Clutch',
      price: 59.99,
      description: 'Elegant satin clutch with detachable chain strap. Perfect for formal events and nights out.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.4,
      type: 'clutch',
      colors: ['Gold', 'Silver', 'Black']
    },
    {
      id: 6,
      name: 'Canvas Shopper Bag',
      price: 49.99,
      description: 'Lightweight canvas tote with reinforced handles and interior pocket. Eco-friendly and durable.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.3,
      type: 'tote',
      colors: ['Natural', 'Blue', 'Red']
    },
    {
      id: 7,
      name: 'Bucket Bag',
      price: 109.99,
      description: 'Structured bucket bag with drawstring closure and top handle. Trendy yet practical design.',
      image: 'https://plus.unsplash.com/premium_photo-1670984076180-22a6c8f27f2b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      type: 'bucket',
      colors: ['Camel', 'Black']
    },
    {
      id: 8,
      name: 'Convertible Hobo Bag',
      price: 129.99,
      description: 'Versatile hobo bag that converts from shoulder to crossbody. Soft pebbled leather with ample space.',
      image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFuZGJhZ3N8ZW58MHx8MHx8fDA%3D',
      rating: 4.6,
      type: 'hobo',
      colors: ['Taupe', 'Burgundy']
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

  const handleCartAction = (bag) => {
    if (addedToCart[bag.id]) {
      dispatch(removecartitem(bag.id));
    } else {
      dispatch(addToCartAction(bag));
    }
  };

  const getMaterialByType = (type) => {
    switch(type) {
      case 'tote': return 'Premium leather';
      case 'crossbody': return 'Genuine leather';
      case 'shoulder': return 'Quilted leather';
      case 'clutch': return 'Satin';
      case 'backpack': return 'Nylon/Leather';
      case 'bucket': return 'Structured leather';
      case 'hobo': return 'Pebbled leather';
      default: return 'High-quality materials';
    }
  };

  const getDimensionsByType = (type) => {
    switch(type) {
      case 'tote': return '12" x 14" x 6"';
      case 'crossbody': return '10" x 8" x 3"';
      case 'shoulder': return '11" x 9" x 4"';
      case 'clutch': return '9" x 5" x 2"';
      case 'backpack': return '10" x 12" x 5"';
      case 'bucket': return '9" x 11" x 6"';
      case 'hobo': return '12" x 10" x 5"';
      default: return 'Varies by style';
    }
  };

  const getClosureByType = (type) => {
    switch(type) {
      case 'tote': return 'Open top';
      case 'crossbody': return 'Zipper';
      case 'shoulder': return 'Magnetic snap';
      case 'clutch': return 'Fold-over';
      case 'backpack': return 'Drawstring';
      case 'bucket': return 'Drawstring';
      case 'hobo': return 'Magnetic snap';
      default: return 'Varies by style';
    }
  };

  const viewDetails = (bag) => {
    navigate(`/product/${bag.id}`, {
      state: {
        ...bag,
        originalPrice: Math.round(bag.price * 1.4 * 100) / 100, 
        discount: 28,
        reviewsCount: 64,
        brand: 'LuxuryBags',
        sku: `HB-${bag.id}`,
        stockStatus: 'In Stock',
        features: [
          'Premium quality materials',
          'Spacious interior',
          'Secure closure'
        ],
        specifications: {
          'Material': getMaterialByType(bag.type),
          'Dimensions': getDimensionsByType(bag.type),
          'Closure': getClosureByType(bag.type),
          'Origin': 'Imported'
        },
        sizes: [], 
        colors: bag.colors 
      }
    });
  };

  return (
    <div className="handbags-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        &larr; Back to Home
      </button>
      
      <h1 className="handbags-header">Handbag Collection</h1>
      <p className="handbags-subheader">Carry your essentials in style</p>
      
      <div className="handbags-grid">
        {handbags.map((bag) => (
          <div key={bag.id} className="handbag-card">
            <div className="handbag-image-container">
              <img 
                src={bag.image} 
                alt={bag.name} 
                className="handbag-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Handbag+Image';
                }}
              />
              <span className="handbag-type-badge">{bag.type}</span>
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(bag.id)}
              >
                {wishlist.includes(bag.id)
                  ? <FaHeart className="wishlist-icon filled" />
                  : <FaRegHeart className="wishlist-icon" />}
              </button>
            </div>
            <div className="handbag-details">
              <h3 className="handbag-name">{bag.name}</h3>
              <div className="handbag-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(bag.rating) ? 'star filled' : 'star'}
                  />
                ))}
                <span className="rating-value">{bag.rating}</span>
              </div>
              <div className="color-options">
                <span className="color-label">Colors:</span>
                <div className="color-chips">
                  {bag.colors.map(color => (
                    <span 
                      key={color} 
                      className="color-chip" 
                      style={{ backgroundColor: color.toLowerCase() === 'natural' ? '#f5f5dc' : color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div className="price-container">
                <span className="current-price">${bag.price.toFixed(2)}</span>
                <span className="original-price">${(bag.price * 1.4).toFixed(2)}</span>
                <span className="discount">28% off</span>
              </div>
              <p className="handbag-description">{bag.description}</p>
              <div className="handbag-buttons">
                <button
                  className={`add-to-cart-btn ${addedToCart[bag.id] ? 'in-cart' : ''}`}
                  onClick={() => handleCartAction(bag)}
                >
                  {addedToCart[bag.id] ? (
                    'Remove from Cart'
                  ) : (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  className="view-details-btn"
                  onClick={() => viewDetails(bag)}
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
export default Handbags;