import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // const API = "http://localhost:5000/api/products";
  const API = "https://inventory-managment-45a9.onrender.com/api/products";


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await axios.post(API, data);
    navigate("/");
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-3">Add New Product</h3>

      <input className="form-control mb-2" placeholder="Name" name="name" onChange={handleChange} />
      <input className="form-control mb-2" placeholder="Category" name="category" onChange={handleChange} />
      <input className="form-control mb-2" type="number" placeholder="Price" name="price" onChange={handleChange} />
      <input className="form-control mb-3" type="number" placeholder="Quantity" name="quantity" onChange={handleChange} />

      <button className="btn btn-success" onClick={submit}>Add Product</button>
    </div>
  );
}
