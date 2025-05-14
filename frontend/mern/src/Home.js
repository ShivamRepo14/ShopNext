import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from './components/HeroBanner';
import './css/Home.css';
import EcommerceHeader from './components/EcommerceHeader';
import ProductCard from './components/ProductCard';

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      name: 'ACCESSORIES',
      image: 'https://media.istockphoto.com/id/1339264709/photo/flat-lay-with-womans-clothes-and-accessories.jpg?s=1024x1024&w=is&k=20&c=jEVAHmR8cL6tB7FTN3cNM1WnGb5fb9sd2f69Lbu3TAU=',
      path: '/category/accessories'
    },
    {
      name: 'FOOTWEAR',
      image: 'https://media.istockphoto.com/id/1279108197/photo/variety-of-womens-fashion-comfortable-shoes-of-all-seasons-on-a-light-background-top-view.jpg?s=1024x1024&w=is&k=20&c=I7--KKDMWMPX0yQsaVUTr5S7jBPH9RcM8owFkL6G00E=',
      path: '/category/footwears'
    },
    {
      name: 'CLOTHING',
      image: 'https://www.fashiongonerogue.com/wp-content/uploads/2024/06/Scarf-Accessory.jpg',
      path: '/category/clothings'
    },
    {
      name: 'HANDBAG',
      image: 'https://img.freepik.com/free-psd/chic-beach-bag-with-accessories-isolated-transparent-background_191095-17855.jpg?semt=ais_hybrid&w=740',
      path: '/category/handbags'
    }
  ];

  return (
    <div className="app">
      <EcommerceHeader
        wishlist={wishlist}
        cart={cart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setWishlist={setWishlist}
        setCart={setCart}
      />


      <main className="main-content">
        <HeroBanner />

        <section className="categories-section">
          {categories.map((category, index) => (
            <Link to={category.path} key={index} className="category-link">
              <div className="category-card">
                <img src={category.image} alt={category.name} className="category-image" />
                <h2>{category.name}</h2>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <ProductCard searchTerm={searchTerm}/>
    </div>
  );
};

export default Home;
