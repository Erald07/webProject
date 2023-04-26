import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function User() {

    const navigate = useNavigate();

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleShowHide1 = () => {
        setShow1(!show1);
    }
    const handleShowHide2 = () => {
        setShow2(!show2);
    }

    const [userInput, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setUser({...userInput, [e.target.name]: e.target.value})
    }

    const submitUser = (e) => {
        e.preventDefault();

        const data = {
            email: userInput.email,
            password: userInput.password,
            confirmPassword: userInput.confirmPassword,
            first_name: userInput.first_name,
            last_name: userInput.last_name,
        }

        axios.post(`/api/store-user`, data).then(res => {

            if(res.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                document.getElementById('USER_FORM').reset();
                navigate('/admin/view-user');
            }
            else if(res.data.status === 400){
                setUser({...userInput, error_list: res.data.errors})
            }
        });
    }

    var display_errors = [];
    if(userInput.error_list){
        display_errors = [
            userInput.error_list.email,
            userInput.error_list.password,
            userInput.error_list.confirmPassword,
            userInput.error_list.first_name,
            userInput.error_list.last_name,
        ];  
    }
    
    return (
        <div className='w-full shadow-2xl p-6'>
            <h1 className='text-3xl pt-3 pb-8 font-medium'>Add User</h1>

            <form onSubmit={submitUser} id='CATEGORY_FORM'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" onChange={handleInput} value={userInput.email} name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{display_errors[0]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <div className='flex'>
                        <input type={show1 ? "text" : "password"} onChange={handleInput} value={userInput.password} name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" autoComplete='current-password' />
                        <span className='text-right pt-3 -translate-x-8'>
                        {show1 ? 
                            (<FontAwesomeIcon icon={faEye} id="show_hide" className="absolute" onClick={handleShowHide1} />) 
                            : 
                            (<FontAwesomeIcon icon={faEyeSlash} id="show_hide" className="absolute" onClick={handleShowHide1} />)
                        }
                        </span>
                    </div>
                    <p className='my-1 text-red-500'>{display_errors[1]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                    <div className='flex'>
                        <input type={show2 ? "text" : "password"} onChange={handleInput} value={userInput.confirmPassword} name="confirmPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" autoComplete='current-password' />
                        <span className='text-right pt-3 -translate-x-8'>
                        {show2 ? 
                            (<FontAwesomeIcon icon={faEye} id="show_hide_confirm" className="absolute" onClick={handleShowHide2} />) 
                            : 
                            (<FontAwesomeIcon icon={faEyeSlash} id="show_hide_confirm" className="absolute" onClick={handleShowHide2} />)
                        }
                        </span>
                    </div>
                    <p className='my-1 text-red-500'>{display_errors[2]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                    <input type="text" onChange={handleInput} value={userInput.first_name} name="first_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{display_errors[3]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                    <input type="confirmPassword" onChange={handleInput} value={userInput.last_name} name="last_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{display_errors[4]}</p>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
}

export default User;