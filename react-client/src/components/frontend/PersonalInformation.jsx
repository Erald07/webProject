import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import ChangePassword from './ChangePassword';

function PersonalInformation() {

    const navigate = useNavigate();

    const [infoUser, setInfoUser] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [idModalProduct, setIDModalProduct] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [error, setError] = useState([]);
    console.log(infoUser);

    const openModalProducts = event => {
        setShowModalProduct(current => !current);
    };

    const closeModalProducts = event => {
        setShowModalProduct(current => !current);
        setIDModalProduct('');
    };

    const openModalUser = event => {
        setShowModalUser(current => !current);
    };

    const closeModalUser = event => {
        setShowModalUser(current => !current);
    };

    const openChangePass = event => {
        setShowModalPass(current => !current);
    };

    const closeModalPass = event => {
        setShowModalPass(current => !current);
    };

    const getIDOrder = (order_id) => {
        // if(!showModal){
        //     setIDModal('');
        // }
        // else{
            setIDModalProduct(order_id);
        // }
    }

    const handleInput = (e) => {
        e.persist();
        setInfoUser({...infoUser, [e.target.name]: e.target.value})
    }

    const updateUser = (e) => {
        e.preventDefault();

        const data = infoUser;
        axios.put(`/api/personal-information/${infoUser?.id}`, data).then(res => {

            if(res.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                setError([]);
                setShowModalUser(false);
            }
            else if(res.data.status === 422){
                Swal.fire({
                    icon: 'error',
                    title: "All fields are mandetory",
                    showConfirmButton: false,
                    timer: 2500
                });
                setError(res.data.errors)
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/personal-information');
            }
        });
    }

    const onClick = (event, order_id) => {
        openModalProducts();
        getIDOrder(order_id);
    }

    useEffect(() => {
        axios.get(`/api/getInfoUser`).then(res => {
            if(res.data.status === 200){
                setInfoUser(res.data.user[0]);
            }
            else if(res.data.status === 401){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: true,
                });
                navigate('/login');
            }
        })

        axios.get(`/api/getOrders`).then(res => {
            if(res.data.status === 200){
                setOrders(res.data.orders);
            }
        })
    }, [navigate]);

    useEffect(() => {
        if(idModalProduct !== ''){
            axios.get(`/api/getOrderDetails/${idModalProduct}`).then(res => {
                if(res.data.status === 200){
                    setOrderDetails(res.data.orderDetails);
                }
            });
        }
    }, [idModalProduct])

    return (
        <div className="flex justify-between">
            <div className="w-1/3 bg-gray-200 py-8 px-6 h-screen">
                {showModalUser ? 
                <div className="flex-col pointer-events-none opacity-40">
                    <h1 className='text-gray-700 text-4xl font-semibold italic mb-5'>Personal Information</h1>
                    <div className="py-2">
                        <label htmlFor="email" className='text-base font-medium italic'>Email</label>
                        <input type="text" name='email' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.email}/>
                    </div>
                    <div className="py-2">
                        <label htmlFor="firstname" className='text-base font-medium italic'>First Name</label>
                        <input type="text" name='firstname' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.first_name}/>
                    </div>
                    <div className="py-2">
                        <label htmlFor="lastname" className='text-base font-medium italic'>Last Name</label>
                        <input type="text" name='lastname' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.last_name}/>
                    </div>
                </div>
                :
                <div className="flex-col">
                    <h1 className='text-gray-700 text-4xl font-semibold italic mb-5'>Personal Information</h1>
                    <div className="py-2">
                        <label htmlFor="email" className='text-base font-medium italic'>Email</label>
                        <input type="text" name='email' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.email} disabled/>
                    </div>
                    <div className="py-2">
                        <label htmlFor="firstname" className='text-base font-medium italic'>First Name</label>
                        <input type="text" name='firstname' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.first_name} disabled/>
                    </div>
                    <div className="py-2">
                        <label htmlFor="lastname" className='text-base font-medium italic'>Last Name</label>
                        <input type="text" name='lastname' className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.last_name} disabled/>
                    </div>
                </div>
                }
                {showModalPass ? <ChangePassword closeModalPass={closeModalPass} /> : ""}
                <div className="py-4">
                    <div className="flex space-x-6">
                        <div className="cursor-pointer flex justify-center w-full px-4 py-2 text-white text-base font-semibold bg-primary rounded-full">
                            <span onClick={openModalUser}>Edit Personal Information</span>
                        </div>
                        <div className="flex justify-center w-full px-4 py-2 text-white text-base font-semibold bg-secondary rounded-full">
                            <span onClick={openChangePass} className='cursor-pointer'>Change Password</span>
                        </div>
                    </div>
                </div>
                {showModalUser ? 
                <form onSubmit={updateUser} className="absolute px-10 py-10 top-20">
                    <span className='float-right pr-4 cursor-pointer' onClick={closeModalUser}><FontAwesomeIcon icon={faXmark} /></span>
                    <div className="bg-white px-8 py-10">
                        <div className="flex-col">
                            <h1 className='text-gray-700 text-4xl font-semibold italic mb-5'>Personal Information</h1>
                            <div className="py-2">
                                <label htmlFor="email" className='text-base font-medium italic'>Email</label>
                                <input type="text" name='email' onChange={handleInput} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.email} />
                                <p className='my-1 text-red-500'>{error.email}</p>
                            </div>
                            <div className="py-2">
                                <label htmlFor="first_name" className='text-base font-medium italic'>First Name</label>
                                <input type="text" name='first_name' onChange={handleInput} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.first_name} />
                                <p className='my-1 text-red-500'>{error.first_name}</p>
                            </div>
                            <div className="py-2">
                                <label htmlFor="last_name" className='text-base font-medium italic'>Last Name</label>
                                <input type="text" name='lastname' onChange={handleInput} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' value={infoUser?.last_name}/>
                                <p className='my-1 text-red-500'>{error.last_name}</p>
                            </div>
                        </div>
                        <div className="px-6 pt-4 ">
                            <div className="bg-primary text-center py-2 text-white text-base font-semibold rounded-full">
                                <button type='submit' >Update</button>
                            </div>
                        </div>
                    </div>
                </form>
                :
                ""
                }   
            </div>
            <div className="w-2/3 py-8 px-16 bg-[#fff1f2]">
                <div className="flex-col">
                    <h1 className='text-gray-700 text-4xl font-semibold italic mb-5'>Orders</h1>
                    <div className="border border-gray-300">
                        <div className="py-3 px-4 border b border-gray-300 bg-[#ffe4e6]">
                            <div className="flex flex-wrap w-full">
                                <p className='text-xl font-medium w-1/5 text-gray-700'>Tracking Number</p>
                                <p className='text-xl font-medium w-1/5 text-gray-700 px-4'>Email</p>
                                <p className='text-xl font-medium w-1/5 text-gray-700'>Payment Mode</p>
                                <p className='text-xl font-medium w-1/5 text-gray-700'>Status</p>
                                <p className='text-xl font-medium w-1/5 text-gray-700'>View Products</p>
                            </div>
                        </div>
                        {orders?.map( (order) => {
                            return(
                                <div key={order.id} className="py-3 px-4 last:border-none border-b border-gray-300">
                                    <div className="flex flex-wrap w-full">
                                        <p className='text-xl font-medium w-1/5 text-gray-500'>{order.tracking_no}</p>
                                        <p className='text-xl font-medium w-1/5 text-gray-500 px-4'>{order.email}</p>
                                        <p className='text-xl font-medium w-1/5 text-gray-500'>{order.payment_mode}</p>
                                        {order.status === 0 ? <p className='text-xl font-medium w-1/5 text-gray-500'>Pending</p> : ""}
                                        {order.status === 1 ? <p className='text-xl font-medium w-1/5 text-gray-500'>Delivered</p> : ""}
                                        {order.status === 2 ? <p className='text-xl font-medium w-1/5 text-gray-500'>Completed</p> : ""}
                                        <p onClick={(e) => onClick(e, order.id)} className='text-base text-center mx-auto font-medium w-20 text-white bg-primary rounded-full hover:bg-white hover:outline hover:text-primary cursor-pointer'>View</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={showModalProduct ? "w-[600px] bg-gray-300 border border-gray-200 rounded-lg absolute top-64 right-80" : "hidden"}>
                        <span className='float-right pr-4 cursor-pointer' onClick={closeModalProducts}><FontAwesomeIcon icon={faXmark} /></span>
                        <div className="px-6 py-8">
                            <div className="flex-col">
                                <div className="flex flex-wrap w-full">
                                    <p className='text-base font-medium w-1/3 text-gray-500 px-4'><span className='border-b border-primary'>Product ID</span></p>
                                    <p className='text-base font-medium w-1/3 text-gray-500 px-4'><span className='border-b border-primary'>Product Quantity</span></p>
                                    <p className='text-base font-medium w-1/3 text-gray-500 px-4'><span className='border-b border-primary'>Price</span></p>
                                </div>
                                {orderDetails.map((details) => {
                                    return(
                                        <div className="flex py-2">
                                            <div className="text-base font-medium w-1/3 text-gray-500 px-4">{details.product.name}</div>
                                            <div className="text-base font-medium w-1/3 text-gray-500 px-4">{details.qty}</div>
                                            <div className="text-base font-medium w-1/3 text-gray-500 px-4">&#36;{details.price}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInformation