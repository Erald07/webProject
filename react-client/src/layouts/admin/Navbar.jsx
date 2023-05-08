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
                            <Link href="#" className="block py-2 pl-3 pr-4 text-white hover:text-blue-600 md:p-0">Home</Link>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white hover:text-blue-600 md:p-0 md:w-auto">Dropdown </button>
                            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <Link>
                                        <p className="block px-4 py-2 text-white">Dashboard</p>
                                    </Link>
                                    <Link>
                                        <p className="block px-4 py-2 text-white">Settings</p>
                                    </Link>
                                    <Link>
                                        <p className="block px-4 py-2 text-white ">Earnings</p>
                                    </Link>
                                </ul>
                                <div className="py-1">
                                    <p className="block px-4 py-2 text-sm text-white">Sign out</p>
                                </div>
                            </div>
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