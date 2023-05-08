import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./collections/Style.css";

function Checkout() {
  const navigate = useNavigate();
  if (!localStorage.getItem("auth_token")) {
    navigate("/");
    Swal.fire({
      icon: "error",
      title: "Login to go to Cart Page",
      showConfirmButton: true,
    });
  }
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(true);
  var totalCartPrice = 0;

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          navigate("/");
          Swal.fire({
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
          });
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) {
    return <div class="loader">Loading checkout...</div>;
  }

  return (
    <div>
      <div className="bg-gray-100 pb-36">
        <div className="container">
          <div className="pt-24 flex-col text-center">
            <h1 className="text-6xl font-bold">Checkout</h1>

            <div className="flex space-x-10">
              <div className="card">
                <div className="card-header">
                  <h4>Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Emai Address</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Full Address</label>
                        <textarea rows="3" className="form-controll"></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>City</label>
                        <input
                          type="text"
                          name="fircitystname"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zipcode"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <button type="button" className="btn btn-primary">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <table className="table table-boarded">
                <thead>
                  <tr>
                    <th width="50%">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    totalCartPrice +=
                      item.product.selling_price * item.product_qty;
                    return (
                      <tr className="last-of-type:border-b border-gray-300">
                        <td>{item.product.name}</td>
                        <td>{item.product.selling_price}</td>
                        <td>{item.product.product_qty}</td>
                        <td>{item.product.selling_price * item.product_qty}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2" className="text-end">
                      Grand Total
                    </td>
                    <td colSpan="2" className="text-end">
                      {totalCartPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
