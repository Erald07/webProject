import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../frontend/collections/Style.css';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`/api/admin/orders`).then(res => {
            if (res.data.status === 200) {
                setOrders(res.data.orders);
                setLoading(false);
            }
        });
    }, []);

    var display_orders = "";
    if (loading) {
        return  <div className="loader"></div>
    } 
    else {
        display_orders = orders.map((item) => {
            return (
                <tr key={item.id} className="text-center items-center border-b-2 border-gray-300 last-of-type:border-none py-4">
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        {item.status === 0 ? "Pending" : ""}
                        {item.status === 1 ? "Delivered" : ""}
                        {item.status === 2 ? "Completed" : ""}
                    </td>
                    <td className="py-3 px-2"><Link to={`/admin/view-order/${item.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>View</Link></td>
                </tr>
            );
        });
    }

    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>Orders</h1>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tracking number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-200'>
                        {display_orders}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
