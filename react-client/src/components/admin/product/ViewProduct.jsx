import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [ViewProduct, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/api/view-product").then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setLoading(false);
      }
    });
  }, []);

  var display_ProductData = "";

  if (loading) {
    return <h4>View Product loading...</h4>;
  } else {
    display_ProductData = viewProduct.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category_id}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={"http://localhost:3000/${item.image}"}
              width="50px"
              alt={item.name}
            ></img>
          </td>
          <td>
            {" "}
            <Link to="edit-product" className="btn btn-succes btn-sm">
              Edit
            </Link>{" "}
          </td>
          <td>
            {" "}
            <button type="button" className="btn btn-danger btn-sm">
              Delete
            </button>{" "}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Product
          <Link
            to="/admin/add-product"
            className="btn btn-succes btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-boardered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Selling Name</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{display_ProductData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
