import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ChangePassword(props) {
    const navigate = useNavigate();

    const [infoPasswords, setInfoPasswords] = useState({
        current_password: '',
        new_password: '',
        new_confirm_password: '',
    });
    const [errors, setErrors] = useState([]);


    const handleChange = (event) => {
        event.preventDefault();

        setInfoPasswords({...infoPasswords, [event.target.name]: event.target.value})
    }

    const ChangePassword = async (event) => {
        event.preventDefault()
    
        const formData = new FormData();
        formData.append('current_password', infoPasswords.current_password);
        formData.append('new_password', infoPasswords.new_password);
        formData.append('new_confirm_password', infoPasswords.new_confirm_password);

        axios.post('/api/changePassword', formData).then(res => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 2500
              });
              setInfoPasswords({
                ...infoPasswords,
                current_password: '',
                new_password: '',
                new_confirm_password: '',
              });
              setErrors([]);
              window.location.reload(true);
            }
            else if (res.data.status === 422) {
              Swal.fire({
                icon: 'error',
                title: "All fields are mandetory",
                showConfirmButton: false,
                timer: 2500
              });
              setErrors(res.data.errors);
            }
        });
    }
    
    return (
        <form onSubmit={ChangePassword}  className="absolute px-10 py-10 top-20">
            <span className='float-right pr-4 cursor-pointer' ><FontAwesomeIcon icon={faXmark} onClick={props.closeModalPass} /></span>
            <div className="bg-white px-8 py-10">
                <div className="flex-col">
                    <h1 className='text-gray-700 text-4xl font-semibold italic mb-5'>Change Password</h1>
                    <div className="py-2">
                        <label htmlFor="current_password" className='text-base font-medium italic'>Old Password</label>
                        <input type="password" name='current_password' onChange={handleChange} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' /*value={infoUser?.email}*/ />
                        <p className='my-1 text-red-500'>{errors.old_password}</p>
                    </div>
                    <div className="py-2">
                        <label htmlFor="new_password" className='text-base font-medium italic'>New Password</label>
                        <input type="password" name='new_password' onChange={handleChange} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' /*value={infoUser?.first_name}*/ />
                        <p className='my-1 text-red-500'>{errors.new_password}</p>
                    </div>
                    <div className="py-2">
                        <label htmlFor="new_confirm_password" className='text-base font-medium italic'>Confirm New Password</label>
                        <input type="password" name='new_confirm_password' onChange={handleChange} className='py-2 px-1 shadow-lg w-full mt-2 rounded-md' /*value={infoUser?.last_name}*//>
                        <p className='my-1 text-red-500'>{errors.new_confirm_password}</p>
                    </div>
                </div>
                <div className="px-6 pt-4 ">
                    <div className="bg-primary text-center py-2 text-white text-base font-semibold rounded-full">
                        <button type='submit'>Change</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword