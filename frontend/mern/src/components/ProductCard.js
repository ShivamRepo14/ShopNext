import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProductCard.css';
import { FaShoppingCart, FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction, removecartitem } from '../contexts/Reducer';

const ProductCard = ({ searchTerm }) => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const cartStatus = {};
    cartItems.forEach(item => {
      cartStatus[item.id] = true;
    });
    setAddedToCart(cartStatus);
  }, [cartItems]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [electronics, jewelery, mensClothing, womensClothing] = await Promise.all([
          fetch('https://fakestoreapi.com/products/category/electronics').then(res => res.json()),
          fetch('https://fakestoreapi.com/products/category/jewelery').then(res => res.json()),
          fetch("https://fakestoreapi.com/products/category/men's%20clothing").then(res => res.json()),
          fetch("https://fakestoreapi.com/products/category/women's%20clothing").then(res => res.json())
        ]);

        const festiveProducts = [
          {
            id: 21,
            title: 'Festive Printed Shirt',
            price: 24.99,
            description: 'Casual festive shirt for men with comfortable fit',
            category: "men's clothing",
            image: 'https://i.pinimg.com/736x/b4/9a/f5/b49af546bce69ccbaf3fe12c8feca949.jpg',
            rating: { rate: 4.5, count: 120 }
          },
          {
            id: 22,
            title: 'Party Wear Dress',
            price: 49.99,
            description: 'Elegant festive dress for women',
            category: "women's clothing",
            image: 'https://i.pinimg.com/736x/f8/ba/60/f8ba60ef55468ffc684daf0f4b985511.jpg',
            rating: { rate: 4.7, count: 89 }
          },
          {
            id: 23,
            title: 'Wireless Bluetooth Speaker',
            price: 59.99,
            description: 'Portable speaker with 20hr battery life',
            category: "electronics",
            image: 'https://i.pinimg.com/736x/74/f1/3b/74f13b8705ddf22f9dee9848004491d4.jpg',
            rating: { rate: 4.3, count: 210 }
          },
          {
            id: 24,
            title: 'Elegant Evening Dress',
            price: 89.99,
            description: 'Beautiful floor-length evening dress with delicate embroidery',
            category: "women's clothing",
            image: 'https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rating: { rate: 4.7, count: 128 },
            sizes: ['S', 'M', 'L', 'XL'],
            color: 'Navy Blue'
          }
        ];

        const allProducts = [...electronics, ...jewelery, ...mensClothing, ...womensClothing, ...festiveProducts];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

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

  const productCategories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  return (
    <div className="app">
      <main className="main-content">
        <section className="latest-products">
          <div className="section-header">
            <h2>LATEST PRODUCTS</h2>
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {productCategories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">No products found.</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div className="product-card" key={product.id}>
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    {wishlist.includes(product.id)
                      ? <FaHeart className="wishlist-icon filled" />
                      : <FaRegHeart className="wishlist-icon" />}
                  </button>

                  <div className="product-image-wrapper">
                    <div className="product-image">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </div>

                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(product.rating?.rate) ? 'star filled' : 'star'}
                        />
                      ))}
                      <span>({product.rating?.count})</span>
                    </div>
                    <div className="price-container">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="original-price">${(product.price * 1.5).toFixed(2)}</span>
                      <span className="discount">50% off</span>
                    </div>
                    <button
                      className={`add-to-cart ${addedToCart[product.id] ? 'in-cart' : ''}`}
                      onClick={() => handleCartAction(product)}
                    >
                      {addedToCart[product.id]
                        ? 'Remove from Cart'
                        : <><FaShoppingCart /> Add to Cart</>}
                    </button>
                    <button
                      className="view-details"
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: {
                            name: product.title,
                            price: product.price,
                            originalPrice: product.price * 1.5,
                            discount: 50,
                            description: product.description,
                            image: product.image,
                            rating: product.rating?.rate || 0,
                            reviewsCount: product.rating?.count || 0,
                            brand: product.category,
                            sku: `SKU-${product.id}`,
                            stockStatus: 'In Stock',
                            features: ['Premium Quality', 'Fast Shipping', 'Durable'],
                            specifications: {
                              Category: product.category,
                              Weight: '500g',
                              Dimensions: '10x10x5 cm'
                            },
                            sizes: ['S', 'M', 'L']
                          }
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductCard;
