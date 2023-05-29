import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Navbar = () => {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if(res.data.status === 200){
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");

                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/');
            }
        });
    }

    return (
        <nav className="bg-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Shop</span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <Link to={'/'} className="block py-2 pl-3 pr-4 text-white hover:text-blue-600 md:p-0">Home</Link>
                        </li>
                        <li>
                            <button onClick={logoutSubmit} className="block py-2 pl-3 pr-4 text-white hover:text-blue-600 md:p-0">Log out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar