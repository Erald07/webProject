import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faChevronRight, faUser, faSliders } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

function Navbar() {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(true);
    const [searchText, setSearchText] = useState('');

    const handleClick = event => {
        setIsShown(current => !current);
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search?query=${encodeURIComponent(searchText)}`);
    };

    useEffect(() => {
        axios.get(`/api/cart`).then(res => {
            if(res.data.status === 200)
            {
                setCart(res.data.cart);
            }
        })
    },[]);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            // setLoading(true);
            if(res.data.status === 200){
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                localStorage.removeItem("auth_id");

                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/');
                window.location.reload(true);
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
            <div onClick={() => setLoading(true)} className="px-2 flex">
                <button onClick={logoutSubmit} className="text-center decoration-none w-full py-2 px-5 rounded-full bg-primary text-white hover:bg-white hover:text-primary duration-75 delay-75 outline-primary outline-1 hover:outline uppercase">
                    {loading ? <svg aria-hidden="true" class="inline w-5 h-5 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg> 
                                :
                                <p>Log Out</p>
                    }
                </button>
            </div>
            <div className='py-2'>
                <Link to={'/personal-information'} onClick={() => setIsShown(false)} className='text-center py-2 px-5 w-full rounded-full bg-slate-400 text-white hover:bg-white hover:text-slate-700 duration-75 delay-75 outline-slate-400 outline-1 hover:outline uppercase'><FontAwesomeIcon className='pr-2' icon={faSliders} />Personal Information</Link>
            </div>
            </>
        );
    }
    return (
        <div className="bg-gray-50 border-b border-gray-150">
            <div className="px-10">
                <div className="px-2 py-5">
                    <div className="justify-between items-center flex">
                        <div className="flex">
                            <div className="pr-4">
                                <Link to={'/'}>Shop All</Link>
                            </div>
                            <div className="px-4">
                                <Link to={'collections'}>Collections</Link>
                            </div>
                            <div className="px-4">
                                <Link to={'about'}>About</Link>
                            </div>
                            <div className="pl-4">
                                <Link to={'contact'}>Contact</Link>
                            </div>
                        </div>
                        <div className="flex">
                            <h1 className='text-3xl font-semibold'><Link to={'/'} >Electronic Shop</Link></h1>
                        </div>
                        <div className="flex">
                            <div className="justify-between flex space-x-6 items-center">
                                <div className="flex space-x-2">
                                    <input type="text" name="search" value={searchText} onChange={handleInputChange} placeholder='Search products..' className='text-base outline-none w-full px-1 py-2 border border-gray-300'/>
                                    <div className="bg-primary px-3 py-2 rounded-md items-center text-white">
                                        <button onClick={handleSearch}><FontAwesomeIcon icon={faChevronRight} /></button>
                                    </div>
                                </div>
                                <div className="flex text-xl text-primary">
                                    <Link to={'cart'}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                                    <span className='absolute ml-4 top-3 bg-primary px-2 py-1 text-white text-xs font-semibold rounded-full'>{cart.length ? cart.length : 0}</span>
                                </div>
                                <div className="flex text-xl">
                                    <FontAwesomeIcon onClick={handleClick} icon={faUser} className='cursor-pointer' />
                                </div>
                                <div className={isShown ? "lg:block absolute top-16 right-12 shadow-xl bg-white z-30 w-[270px] space-y-2 py-4 text-center" : "hidden"}>
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