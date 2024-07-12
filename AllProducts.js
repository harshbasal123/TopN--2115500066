import React, { useState } from 'eact';
import ProductCard from './ProductCard';

const AllProducts = ({ products, onFilterChange }) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handleSortChange = (sortType) => {
    let sortedProductsTemp = [...products];
    switch (sortType) {
      case 'price':
        sortedProductsTemp.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        sortedProductsTemp.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        sortedProductsTemp.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    setSortedProducts(sortedProductsTemp);
  };

  return (
    <div>
      <h1>All Products</h1>
      <div>
        <label>Category:</label>
        <select value={categoryFilter} onChange={e => handleFilterChange('category', e.target.value)}>
          <option value="">All</option>
          {products.map(product => (
            <option key={product.category} value={product.category}>
              {product.category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Company:</label>
        <select value={companyFilter} onChange={e => handleFilterChange('company', e.target.value)}>
          <option value="">All</option>
          {products.map(product => (
            <option key={product.company} value={product.company}>
              {product.company}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" value={ratingFilter} onChange={e => handleFilterChange('rating', e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={priceFilter} onChange={e => handleFilterChange('price', e.target.value)} />
      </div>
      <div>
        <label>Availability:</label>
        <select value={availabilityFilter} onChange={e => handleFilterChange('availability', e.target.value)}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>
      <div>
        <label>Sort by:</label>
        <select onChange={e => handleSortChange(e.target.value)}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
      </div>
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;