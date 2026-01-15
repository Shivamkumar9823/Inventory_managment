import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [stats, setStats] = useState({});

  const API = "http://localhost:5000/api/products";

  const loadStats = async () => {
  const res = await axios.get(`${API}/stats`);
  setStats(res.data);
};

  const loadData = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const search = async () => {
    if (!query.trim()) return loadData();
    const res = await axios.get(`${API}/search/${query}`);
    setProducts(res.data);
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
    loadStats()
  }, []);

  return (
    <div>
      <h2 className="mb-3">Inventory Products</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Search product..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={search}>Search</button>
      </div>
      <div className="row mb-4">

  <div className="col-md-3">
    <div className="card shadow text-center p-3 border-primary">
      <h6>Total Products</h6>
      <h3 className="text-primary">{stats.totalProducts}</h3>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow text-center p-3 border-success">
      <h6>Total Items in Stock</h6>
      <h3 className="text-success">{stats.totalItems}</h3>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow text-center p-3 border-warning">
      <h6>Low Stock (≤5)</h6>
      <h3 className="text-warning">{stats.lowStock}</h3>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow text-center p-3 border-danger">
      <h6>Out of Stock</h6>
      <h3 className="text-danger">{stats.outOfStock}</h3>
    </div>
  </div>

</div>


      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <Link className="btn btn-sm btn-warning me-2" to={`/update/${p._id}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => remove(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
