import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ products }) => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(product =>
    product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
