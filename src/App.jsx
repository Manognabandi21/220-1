import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    os: '',
    price: ''
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8081/insert', product);
    alert('Insert success');
    fetchProducts();
  };

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8081/display');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input type="number" name="id" className="form-control" value={product.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>OS:</label>
          <input type="text" name="os" className="form-control" value={product.os} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="text" name="price" className="form-control" value={product.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Insert</button>
      </form>

      <h3 className="mt-5">Product List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>OS</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.os}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
