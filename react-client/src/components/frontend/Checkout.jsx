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

  const [checkoutInput, setcheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [error, setError] = useState([]);
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

  const handleInput = (e) => {
    e.persist();
    setcheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = (e) => {
    e.preventDefault();

    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
    };
    axios.post("/api/place-order", data).then((res) => {
      if (res.data.status === 200) {
        swal("Order Placed Successfully", res.data.message, "success");
        setError([]);
        navigate.push("thank you");
      } else if (res.data.status === 422) {
        swal("All fields are mandetory", "", "error");
        setError(res.data.errors);
      }
    });
  };

  if (loading) {
    return <div class="loader">Loading checkout...</div>;
  }
  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = <div className="relative"></div>;
  } else {
    <div className="text-center border border-gray-300 py-16">
      <h1 className="text-3xl font-bold">Your Shopping Cart is Empty.</h1>
    </div>;
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
                          onChange={handleInput}
                          value={checkoutInput.firstname}
                        ></input>
                        <small className="text-danger">{error.firstname}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.lastname}
                        ></input>
                        <small className="text-danger">{error.lastname}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.phone}
                        ></input>
                        <small className="text-danger">{error.phone}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Emai Address</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.email}
                        ></input>
                        <small className="text-danger">{error.email}</small>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Full Address</label>
                        <textarea
                          rows="3"
                          name="address"
                          className="form-controll"
                          onChange={handleInput}
                          value={checkoutInput.address}
                        ></textarea>
                        <small className="text-danger">{error.address}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.city}
                        ></input>
                        <small className="text-danger">{error.city}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.state}
                        ></input>
                        <small className="text-danger">{error.state}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zipcode"
                          className="form-control"
                          onChange={handleInput}
                          value={checkoutInput.zipcode}
                        ></input>
                        <small className="text-danger">{error.zipcode}</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={submitOrder}
                        >
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
