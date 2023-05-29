import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../frontend/collections/Style.css';

function ViewOrder(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        status: '',
    });

    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setOrder({ ...order, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get(`/api/admin/view-order/${id}`).then(res => {
            if (res.data.status === 200) {
                setOrder(res.data.order);
            }
            else if (res.data.status === 404) {
                Swal("Error", res.data.message, "error");
                navigate('/admin/orders');
            }
            setLoading(false);
        });

    }, [id, navigate]);

    const updateOrder = (e) => {
        e.preventDefault()

        const data = order;
        axios.put(`/api/update-order/${id}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/admin/orders');
            }
            else if (res.data.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: "All fields are mandetory",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            else if (res.data.status === 404) {
                Swal("Error", res.data.message, "error");
                navigate('/admin/view-product');
            }
        });
    }

    if (loading) {
        return  <div className="loader"></div>
    }

    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>Edit Status Order</h1>
                <Link to={'/admin/orders'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-md h-fit py-2 mt-6'>Back</Link>
            </div>
            <form onSubmit={updateOrder} id='ORDER_FORM'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="text" value={order.email} name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                </div>
                <div className="mb-6 flex space-x-5">
                    <div className="w-full">
                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                        <input type="text" value={order.firstname} name="firstname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                        <input type='text' value={order.lastname} name="lastname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>               
                    </div>
                </div>
                <div className="mb-6 flex space-x-5">
                    <div className='w-full'>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input type='text' value={order.phone} name="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900 ">Zip Code</label>
                        <input type='text' value={order.zipcode} name="zipcode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="payment_mode" className="block mb-2 text-sm font-medium text-gray-900 ">Payment Mode</label>
                        <input type='text' value={order.payment_mode} name="payment_mode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                </div>
                <div className="mb-6 flex space-x-5">
                    <div className='w-full'>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                        <input type='text' value={order.address} name="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                        <input type='text' value={order.city} name="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 ">State</label>
                        <input type='text' value={order.state} name="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="tracking_no" className="block mb-2 text-sm font-medium text-gray-900 ">Tracking Number</label>
                    <input type='text' value={order.tracking_no} name="tracking_no" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Select Order Status</label>
                    <select onChange={handleInput} value={order.status} name='status' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" >
                        <option { ...order.status === 0 ? 'selected' : '' } value={0} >Pending</option>
                        <option { ...order.status === 1 ? 'selected' : '' } value={1}>Delivered</option>
                        <option { ...order.status === 2 ? 'selected' : '' } value={2}>Completed</option>
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
            </form>
        </div>
    );
}

export default ViewOrder;