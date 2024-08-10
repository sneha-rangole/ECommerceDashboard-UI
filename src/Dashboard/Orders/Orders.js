import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    orderStatus: 'completed',
    selectedProducts: [],
    totalAmount: 0,
  });
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'shipped':
        return 'status-shipped';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  const handleProductChange = (productId, price) => {
    const selectedProducts = newOrder.selectedProducts.includes(productId)
      ? newOrder.selectedProducts.filter((id) => id !== productId)
      : [...newOrder.selectedProducts, productId];

    const totalAmount = selectedProducts.reduce((total, id) => {
      const product = products.find((product) => product._id === id);
      return product ? total + product.price : total;
    }, 0);

    setNewOrder({ ...newOrder, selectedProducts, totalAmount });
  };

  const handleSubmit = async () => {
    const orderData = {
      orderId: newOrder.orderId,
      userId: 'user1', 
      products: newOrder.selectedProducts,
      totalAmount: newOrder.totalAmount,
      orderStatus: newOrder.orderStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      setOrders([...orders, orderData]); 
      setPopupOpen(false); 
      setNewOrder({ orderId: '', orderStatus: 'completed', selectedProducts: [], totalAmount: 0 }); // Reset form
    } catch (error) {
      console.error('Failed to create order', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <button className="create-new-order-btn" onClick={() => setPopupOpen(true)}>Create New Order</button>

      {isPopupOpen && (
        <div className="popup">
          <h3>Create New Order</h3>
          <input
            type="text"
            placeholder="Order ID"
            value={newOrder.orderId}
            onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })}
          />
          <select
            value={newOrder.orderStatus}
            onChange={(e) => setNewOrder({ ...newOrder, orderStatus: e.target.value })}
          >
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
            <option value="pending">Pending</option>
          </select>

          <div>
            <h4>Select Products</h4>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="product-list">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id}>
                    <input
                      type="checkbox"
                      className='checkbox-input'
                      id={product._id}
                      checked={newOrder.selectedProducts.includes(product._id)}
                      onChange={() => handleProductChange(product._id, product.price)}
                    />
                    <label htmlFor={product._id}>{product.name} - ${product.price}</label>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>

          <h4>Total Amount: ${newOrder.totalAmount.toFixed(2)}</h4>
          <button onClick={handleSubmit}>Save Order</button>
          <button onClick={() => setPopupOpen(false)}>Cancel</button>
        </div>
      )}

      <div className="card-container">
        {orders.map(order => (
          <div key={order.orderId} className={`order-card ${getStatusClass(order.orderStatus)}`}>
            <h3>{order.orderId}</h3>
            <hr />
            <p><strong>User ID:</strong> {order.userId}</p>
            <hr />
            <p><strong>Products:</strong> {order.products.join(', ')}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
