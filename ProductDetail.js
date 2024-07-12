import React from 'react';

const ProductDetail = ({ products, match }) => {
  const productId = match.params.id;
  const product = products.find(product => product.id === productId);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}/5</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      <img src={`https://picsum.photos/400/600?random=${product.id}`} alt={product.name} />
    </div>
  );
};

export default ProductDetail;