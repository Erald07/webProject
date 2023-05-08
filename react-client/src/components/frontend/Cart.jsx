import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './collections/Style.css';

function Cart() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(true);
    var totalCartPrice = 0;

    if(!localStorage.getItem('auth_token')){
        navigate('/');
        Swal.fire({
            icon: 'error',
            title: "Login to go to Cart Page",
            showConfirmButton: true,
        });
    }

    const handleDecrement = (cart_id) => {
        setCart(cart => 
            cart.map( (item) => 
                cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0)} : item
            )
        );
        updateCartQty(cart_id, "dec");
    }

    const handleIncrement = (cart_id) => {
        setCart(cart => 
            cart.map( (item) => 
                cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0)} : item
            )
        );
        updateCartQty(cart_id, "inc");
    }

    function updateCartQty(cart_id, scope){
        axios.put(`/api/cart-updateqty/${cart_id}/${scope}`).then(res => {
            if(res.data.status === 200){
            }
        })
    }

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;

        axios.delete(`/api/delete-cartitem/${cart_id}`).then( res => {
            if(res.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                });
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    showConfirmButton: true,
                });
            }
        })
    }

    useEffect(() => {
        
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
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
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: true,
                    });
                }
            }
        })

        return () => {
            isMounted = false
        };
    }, [navigate]);


    if(loading){
        return  <div class="loader"></div>
    }

    var cart_HTML = '';
    if(cart.length > 0){
        cart_HTML =   <div className="relative">
        <table className='w-full mt-5 border border-gray-300 text-left'>
            <thead className='bg-slate-200'>
                <tr className='border-b border-gray-100 text-gray-600'>
                    <th className="px-20 py-3"></th>
                    <th className="pr-32 py-3">Product</th>
                    <th className="pr-20 py-3">Price</th>
                    <th className="pr-32 py-3">Quantity</th>
                    <th className="pr-16 py-3">Subtotal</th>
                    <th className="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {cart.map( (item) => {
                    totalCartPrice += item.product.selling_price * item.product_qty;
                    return(
                        <tr className='last-of-type:border-b border-gray-300'>
                            <td className="px-4 py-3"><img src="https://media.wired.com/photos/63f00cfbde5e9cf54ad7754a/4:3/w_1536,h_1152,c_limit/Best-Android-Phones-2023-Featured-2023.jpg" alt={item.product.name} className='w-64'/></td>
                            <td className="pr-4 py-3">{item.product.name}</td>
                            <td className="pr-12 py-3">{item.product.selling_price}</td>
                            <td className="pr-20 py-3">
                                <div className="w-full border border-gray-300">
                                    <div className="py-2 px-3 flex text-gray-500">
                                        <button type='button' onClick={() => handleDecrement(item.id)} className='input-group-text'>-</button>
                                        <div className='form-control text-center w-full bg-gray-100 outline-none'>{item.product_qty}</div>
                                        <button type='button' onClick={() => handleIncrement(item.id)}  className='input-group-text'>+</button>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-10 py-3">{item.product.selling_price * item.product_qty}</td>
                            <td className="px-4 py-3"><FontAwesomeIcon onClick={(e) => deleteCartItem(e, item.id)} icon={faCircleXmark} className='text-xl opacity-50 hover:opacity-100 duration-300 ease-linear' /></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    }
    else{
        <div className='text-center border border-gray-300 py-16'>
            <h1 className='text-3xl font-bold'>Your Shopping Cart is Empty.</h1>
        </div>
    }

    return (
        <div className='bg-gray-100 pb-36'>
            <div className="container">
                <div className="pt-24 flex-col text-center">
                    <h1 className='text-6xl font-bold'>Cart</h1>
                    <div className="flex space-x-10">
                        {cart_HTML}
                        <div className="w-full mt-5">
                            <div className="border border-gray-300">
                                <div className="bg-slate-200">
                                    <div className="py-2 px-4">
                                        <h1 className='text-2xl font-bold text-left'>Cart totals</h1>
                                    </div>
                                </div>
                                <div className="px-4 py-8">
                                    <div className="py-4 px-2 border-b border-gray-300">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className='pr-24'>{totalCartPrice}</span>
                                        </div>
                                    </div>
                                    <div className="py-4 px-2 border-b border-gray-300">
                                        <div className="flex justify-between">
                                            <span>Total</span>
                                            <span className='pr-24'>{totalCartPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-8 px-6 justify-center">
                                    <button className='uppercase text-center py-4 bg-primary hover:bg-black text-white w-full rounded-md text-xl font-normal'>checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart