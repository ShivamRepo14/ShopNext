import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import { removecartitem, incrementQuantity, decrementQuantity } from './Reducer';
import { FaTimes, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { BsCartX } from 'react-icons/bs';

const Cart = () => {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const removeItem = (item) => {
        dispatch(removecartitem(item.id));
    };

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item.id));
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(decrementQuantity(item.id));
        } else {
            dispatch(removecartitem(item.id));
        }
    };
    
    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const calculateTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const renderProductDetails = (item) => {
        return (
            <div className="product-meta">
                {item.rating && (
                    <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                                key={i} 
                                className={`star ${i < Math.floor(item.rating.rate) ? 'filled' : ''}`}
                                size={12}
                            />
                        ))}
                        <span>({item.rating.count})</span>
                    </div>
                )}
                
                {item.sizes && item.sizes.length > 0 && (
                    <div className="size-selector">
                        <span className="size-label">Size: </span>
                        <select className="size-dropdown">
                            {item.sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                )}
                
                {item.color && (
                    <div className="color-selector">
                        <span className="color-label">Color: </span>
                        <span className="color-value">{item.color}</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="cart-container">
            <button 
                onClick={() => navigate('/')}
                className="back-button"
            >
                &larr; Back to Home
            </button>
            
            <h2 className="cart-title">Your Shopping Cart ({calculateTotalItems()})</h2>
            
            {items.length === 0 ? (
                <div className="empty-cart">
                    <BsCartX className="empty-cart-icon" />
                    <p>Your cart is empty</p>
                    <button 
                        className="continue-shopping-btn"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                
                                <div className="item-details">
                                    <h3 className="item-title">{item.title}</h3>
                                    <p className="item-category">{item.category}</p>
                                    
                                    {renderProductDetails(item)}
                                    
                                    <div className="quantity-controls">
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => decreaseQuantity(item)}
                                            aria-label="Decrease quantity"
                                        >
                                            <FaMinus size={10} />
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => increaseQuantity(item)}
                                            aria-label="Increase quantity"
                                        >
                                            <FaPlus size={10} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                    {item.quantity > 1 && (
                                        <span className="unit-price">(${item.price.toFixed(2)} each)</span>
                                    )}
                                </div>
                                
                                <button 
                                    className="remove-item-btn"
                                    onClick={() => removeItem(item)}
                                    aria-label="Remove item"
                                >
                                    <FaTimes size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal ({calculateTotalItems()} items)</span>
                            <span>${calculateSubtotal()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Estimated Tax</span>
                            <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${(parseFloat(calculateSubtotal()) * 1.08).toFixed(2)}</span>
                        </div>
                        
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;