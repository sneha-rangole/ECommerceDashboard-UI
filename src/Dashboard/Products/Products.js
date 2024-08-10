import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        ...newProduct,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setProducts([...products, response.data]);
      resetPopup();
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${currentProductId}`, {
        ...newProduct,
        updatedAt: new Date().toISOString(),
      });
      setProducts(products.map(product => (product._id === currentProductId ? response.data : product)));
      resetPopup();
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  const resetPopup = () => {
    setShowPopup(false);
    setEditMode(false);
    setCurrentProductId(null);
    setNewProduct({ name: '', description: '', price: '', category: '' });
  };

  const openEditPopup = (product) => {
    setNewProduct(product);
    setCurrentProductId(product._id);
    setEditMode(true);
    setShowPopup(true);
  };

  const categoryColors = {
    Electronics: '#3498db',
    Accessories: '#e67e22',
    Bags: '#2ecc71',
    Furniture: '#9b59b6',
    Fitness: '#f39c12',
    'Office Supplies': '#34495e',
    Wearables: '#e74c3c',
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <button className="create-new-order-btn" onClick={() => setShowPopup(true)}>Create New Product</button>
      {showPopup && (
        <div className="popup">
          <h3>{editMode ? 'Edit Product' : 'Add New Product'}</h3>
          <label>
            Product Name:
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
          </label>
          <label>
            Category:
            <select name="category" value={newProduct.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              {Object.keys(categoryColors).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <button onClick={editMode ? handleEditProduct : handleCreateProduct}>
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={resetPopup}>Cancel</button>
        </div>
      )}
      <div className="card-container">
        {products.map(product => (
          <div 
            key={product._id} 
            className="product-card" 
            style={{
              borderLeft: `5px solid ${categoryColors[product.category] || '#000'}`, 
            }}
          >
            <div className="product-actions">
              <button onClick={() => openEditPopup(product)} className="edit-button">✏️</button>
              <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">
                🗑️
              </button>
            </div>
            <h3>{product.name}</h3>
            <hr />
            <p>{product.description}</p>
            <hr />
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
