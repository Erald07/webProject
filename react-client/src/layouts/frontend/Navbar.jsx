import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

function Navbar() {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        setIsShown(current => !current);
    };

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
                setIsShown(current => !current);
            }
        });
    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            <>
            <div className="py-4 px-2 flex">
                <div className="flex-col w-full">
                    <div className="w-full">
                        <Link to={'/login'} className="text-center decoration-none w-full py-2 px-5 rounded-full bg-primary text-white hover:bg-white hover:text-primary duration-75 delay-75 outline-primary outline-1 hover:outline uppercase">LOG IN</Link>
                    </div>
                </div>
            </div>
            <p className="text-primary text-center"><Link to={'/register'} className="underline underline-offset-4 decoration-solid decoration-primary">Register here</Link></p>
            </>
        );
    }
    else{
        let name = localStorage.getItem("auth_name");
        AuthButtons = (
            <>
            <h2 className="py-2 text-center text-2xl lg:text-lg font-semibold text">Hi {name}!</h2>
            <div className="px-2 flex">
                <button onClick={logoutSubmit} className="text-center decoration-none w-full py-2 px-5 rounded-full bg-primary text-white hover:bg-white hover:text-primary duration-75 delay-75 outline-primary outline-1 hover:outline uppercase">Log out</button>
            </div>
            </>
        );
    }
    return (
        <div className="bg-gray-100">
            <div className="container">
                <div className="px-2 py-5">
                    <div className="justify-between items-center flex">
                        <div className="flex">
                            <div className="pr-4">
                                <Link>Shop All</Link>
                            </div>
                            <div className="px-4">
                                <Link>Electric Scooters</Link>
                            </div>
                            <div className="px-4">
                                <Link>Accessories</Link>
                            </div>
                            <div className="px-4">
                                <Link to={'about'}>About</Link>
                            </div>
                            <div className="pl-4">
                                <Link to={'contact'}>Contact</Link>
                            </div>
                        </div>
                        <div className="flex">
                            <h1 className='text-3xl font-semibold'>Gangot</h1>
                        </div>
                        <div className="flex">
                            <div className="justify-between flex space-x-6 items-center">
                                <div className="flex space-x-2">
                                    <input type="text" name="search" placeholder='Search products..' className='text-base outline-none w-full px-1 py-2 border border-gray-300'/>
                                    <div className="bg-primary px-3 py-2 rounded-md items-center text-white">
                                        <button><FontAwesomeIcon icon={faChevronRight} /></button>
                                    </div>
                                </div>
                                <div className="flex text-xl text-primary">
                                    <FontAwesomeIcon icon={faBasketShopping} />
                                </div>
                                <div className="flex text-xl">
                                    <FontAwesomeIcon onClick={handleClick} icon={faUser} className='cursor-pointer' />
                                </div>
                                <div className={isShown ? "lg:block absolute top-16 right-24 shadow-xl bg-white z-30 w-[270px] space-y-2 py-4 text-center" : "hidden"}>
                                    {isShown && (AuthButtons)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar