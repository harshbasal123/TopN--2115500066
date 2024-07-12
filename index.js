import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'eact-router-dom';
import AllProducts from './AllProducts';
import ProductDetail from './ProductDetail';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
     .then(response => {
        const productsData = response.data;
        setProducts(productsData);
        setFilteredProducts(productsData);
        const categoriesSet = new Set();
        const companiesSet = new Set();
        productsData.forEach(product => {
          categoriesSet.add(product.category);
          companiesSet.add(product.company);
        });
        setCategories(Array.from(categoriesSet));
        setCompanies(Array.from(companiesSet));
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setFilteredProducts(products.filter(product => product.category === value));
        break;
      case 'company':
        setFilteredProducts(products.filter(product => product.company === value));
        break;
      case 'rating':
        setRatingFilter(value);
        setFilteredProducts(products.filter(product => product.rating >= value));
        break;
      case 'price':
        setPriceFilter(value);
        setFilteredProducts(products.filter(product => product.price <= value));
        break;
      case 'availability':
        setAvailabilityFilter(value);
        setFilteredProducts(products.filter(product => product.availability === value));
        break;
      default:
        break;
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <AllProducts products={filteredProducts} onFilterChange={handleFilterChange} />} />
        <Route path="/product/:id" component={() => <ProductDetail products={products} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;