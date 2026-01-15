import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const API = "http://localhost:5000/api/products";

  useEffect(() => {
    axios.get(API).then(res => {
      const item = res.data.find(p => p._id === id);
      setData(item);
    });
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const update = async () => {
    await axios.put(`${API}/${id}`, data);
    navigate("/");
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-3">Update Product</h3>
       <p> Name : </p>
      <input className="form-control mb-2" value={data?.name || ""} name="name" onChange={handleChange} />
       <p> category : </p>
      <input className="form-control mb-2" value={data?.category || ""} name="category" onChange={handleChange} />
       <p> price : </p>
      <input className="form-control mb-2" value={data?.price || ""} type="number" name="price" onChange={handleChange} />
       <p> quantity: </p>
      <input className="form-control mb-3" value={data?.quantity || ""} type="number" name="quantity" onChange={handleChange} />

      <button className="btn btn-primary" onClick={update}>Update Product</button>
    </div>
  );
}
