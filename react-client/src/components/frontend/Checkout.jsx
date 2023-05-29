import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, } from 'react-router-dom';
import { PayPalButton } from '@paypal/react-paypal-js';
import './Style.css'

function Checkout()
{

    const navigate = useNavigate();
    if(!localStorage.getItem('auth_token')){
        navigate('/');
        Swal.fire({
            icon: 'warning',
            title: "Login to go to Cart Page",
            showConfirmButton: true,
        });
    }
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    navigate('/');
                    Swal.fire({
                        icon: "warning",
                        title: res.data.message,
                        showConfirmButton: true,
                    });
                }
            }
        }); 
 
        return () => {
            isMounted = false
        };
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

    // var orderinfo_data = {
    //     firstname: checkoutInput.firstname,
    //     lastname: checkoutInput.lastname,
    //     phone: checkoutInput.phone,
    //     email: checkoutInput.email,
    //     address: checkoutInput.address,
    //     city: checkoutInput.city,
    //     state: checkoutInput.state,
    //     zipcode: checkoutInput.zipcode,
    //     payment_mode: 'Paid by PayPal',
    //     payment_id: '',
    // }

   
    // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    // const createOrder = (data, actions) =>{
    //     return actions.order.create({
    //       purchase_units: [
    //         {
    //           amount: {
    //             value: totalCartPrice,
    //           },
    //         },
    //       ],
    //     });
    // };
    // const onApprove = (data, actions) => {
        
    //     return actions.order.capture().then(function(details) {
    //         console.log(details);
    //         orderinfo_data.payment_id = details.id;

    //         axios.post(`/api/place-order`, orderinfo_data).then(res=>{
    //             if(res.data.status === 200)
    //             {
    //                 Swal("Order Placed Successfully",res.data.message,"success");
    //                 setError([]);
    //                 navigate('/thank-you');
    //             }
    //             else if(res.data.status === 422)
    //             {
    //                 Swal("All fields are mandetory","","error");
    //                 setError(res.data.errors);
    //             }
    //         });
    //     });
    // };
    // End-Paypal Code

    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: '',
        }

        // switch (payment_mode) {
        //     case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        Swal.fire({
                            icon: 'success',
                            title: res.data.message,
                            timer: 1500,
                        });
                        setError([]);
                        navigate('/thank-you');
                    }
                    else if(res.data.status === 422)
                    {
                        Swal.fire({
                            icon: 'error',
                            title: "All fields are mandetory",
                            showConfirmButton: true,
                        });
                        setError(res.data.errors);
                    }
                });
        //         break;

        //     case 'razorpay':
        //         axios.post(`/api/validate-order`, data).then(res=>{
        //             if(res.data.status === 200)
        //             {
        //                 setError([]);
        //                 var options = {
        //                     "key": "rzp_test_5AEIUNtEJxBPvS",
        //                     "amount": (1 * 100), 
        //                     "name": "Funda Reat Ecom",
        //                     "description": "Thank you for purchasing with Funda",
        //                     "image": "https://example.com/your_logo",
        //                     "handler": function (response){
        //                         data.payment_id = response.razorpay_payment_id;

        //                         axios.post(`/api/place-order`, data).then(place_res=>{
        //                             if(place_res.data.status === 200)
        //                             {
        //                                 Swal("Order Placed Successfully",place_res.data.message,"success");
        //                             navigate('/thank-you');
        //                             }
        //                         });
        //                     },
        //                     "prefill": {
        //                         "name": data.firstname + data.lastname,
        //                         "email": data.email,
        //                         "contact": data.phone
        //                     },
        //                     "theme": {
        //                         "color": "#3399cc"
        //                     }
        //                 };
        //                 var rzp = new window.Razorpay(options);
        //                 rzp.open();
        //             }
        //             else if(res.data.status === 422)
        //             {
        //                 Swal("All fields are mandetory","","error");
        //                 setError(res.data.errors);
        //             }
        //         });
        //         break;

        //     case 'payonline':
        //         axios.post(`/api/validate-order`, data).then(res=>{
        //             if(res.data.status === 200)
        //             {
        //                 setError([]);
        //                 var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
        //                 myModal.show();
        //             }
        //             else if(res.data.status === 422)
        //             {
        //                 Swal("All fields are mandetory","","error");
        //                 setError(res.data.errors);
        //             }
        //         });
        //         break;
        
        //     default:
        //         break;
        // }
       
    }

    if(loading)
    {
        return  <div class="loader"></div>
    }

    var checkout_HTML = '';
    if(cart.length > 0)
    {
        checkout_HTML = <div>
            <div className="flex flex-wrap space-x-14">
                <div className="flex-col w-3/6">
                    <div className="flex-col">
                        <h1 className='text-3xl pb-4 font-bold'>Customer Information</h1>
                        <div className="w-full py-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email <span className='text-red-600'>*</span></label>
                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='Username or Email Address' />
                            <small className="text-red-600">{error.email}</small>
                        </div>
                    </div>
                    <div className="flex-col">
                        <h1 className='text-3xl pt-6 pb-4 font-bold'>Billing Deatils</h1>
                        <div className="py-2 flex space-x-5">
                            <div className="w-full">
                                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 ">First Name <span className='text-red-600'>*</span></label>
                                <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='First Name' />
                                <small className="text-red-600">{error.firstname}</small>
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name <span className='text-red-600'>*</span></label>
                                <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='Last Name' />
                                <small className="text-red-600">{error.lastname}</small>
                            </div>
                        </div>
                        <div className="py-2 flex space-x-5">
                            <div className="w-full">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone <span className='text-red-600'>*</span></label>
                                <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='Phone' />
                                <small className="text-red-600">{error.phone}</small>
                            </div>
                            <div className="w-full">
                                <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900 ">Zip Code <span className='text-red-600'>*</span></label>
                                <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='Zip Code' />
                                <small className="text-red-600">{error.zipcode}</small>
                            </div>
                        </div>
                        <div className="py-2 flex space-x-5">
                            <div className="w-full py-2">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address <span className='text-red-600'>*</span></label>
                                <input name="address" onChange={handleInput} value={checkoutInput.address} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='House number and street name' />
                                <small className="text-red-600">{error.address}</small>
                            </div>
                            <div className="w-full py-2">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City <span className='text-red-600'>*</span></label>
                                <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='Town / City' />
                                <small className="text-red-600">{error.city}</small>
                            </div>
                            <div className="w-full py-2">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 ">State <span className='text-red-600'>*</span></label>
                                <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder='State' />
                                <small className="text-red-600">{error.state}</small>
                            </div>
                        </div>
                        <div className="w-full py-2">
                            <div className="form-group text-end">
                                <button type="button" className="px-4 py-2 text-xl font-medium uppercase text-white bg-primary tracking-wider" onClick={submitOrder}>Place Order</button>
                                {/* <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'razorpay') }>Pay by Razorpay</button>
                                <button type="button" className="btn btn-warning mx-1" onClick={ (e) => submitOrder(e, 'payonline') }>Pay Online</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col w-2/5">
                    <h1 className='text-3xl pb-6 font-bold'>Your Order</h1>
                    <div className="border border-gray-300">
                        <div className="py-4 px-4 flex justify-between">
                            <h1 className='text-base text-gray-500'>Cart totals</h1>
                            <h1 className='text-base text-gray-500'>Subtotals</h1>
                        </div>
                        <div className='border-t border-gray-200 py-3'>
                        {cart.map( (item, idx) => {
                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return (
                                <div key={idx} className='flex justify-between p-4 items-center'>
                                    <div className="flex items-center">
                                        <img src={`http://localhost:8000/${item.product.photo}`} className='w-14' alt="" />
                                        <h1 className='pl-4 text-gray-500'>{item.product.name}</h1>
                                    </div>
                                    <h1 className='text-gray-500'>&#36;{item.product.selling_price * item.product_qty}</h1>
                                </div>
                            );
                        })}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between">
                                <h1 className='text-gray-500'>Subtotal</h1>
                                <h1 className='text-gray-500'>&#36;{totalCartPrice}</h1>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between">
                                <h1 className='text-gray-700 font-bold text-xl'>Total</h1>
                                <h1 className='text-gray-700 font-bold text-xl'>&#36;{totalCartPrice}</h1>
                            </div>
                        </div>
                    </div>                       
                </div>
            </div>
        </div>
    }
    else
    {
        checkout_HTML = <div>
            <div className="py-6 px-10 justify-center items-center shadow-md text-center italic text-3xl font-semibold text-gray-500">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
            </div>
        </div>
    }

    return (
        <>
        <div>
            <h1 className='text-6xl font-bold text-center pt-14 pb-6'>Checkout</h1>
            <div className="py-4">
                <div className="container">
                   {checkout_HTML}
                </div>
            </div>
        </div>
        <div className="modal-body">
            <hr/>
            {/* <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            /> */}
        </div>
    </>

    )
}



export default Checkout;