import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Category() {

    const navigate = useNavigate();

    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        description: '',
        status: 0,
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
            slug: categoryInput.slug,
            description: categoryInput.description,
            status: categoryInput.status,
        }

        axios.post(`/api/store-category`, data).then(res => {

            if(res.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                document.getElementById('CATEGORY_FORM').reset();
                navigate('/admin/view-category');
            }
            else if(res.data.status === 400){
                setCategory({...categoryInput, error_list: res.data.errors})
            }
        });
    }

    var display_errors = [];
    if(categoryInput.error_list){
        display_errors = [
            categoryInput.error_list.name,
            categoryInput.error_list.slug,
            categoryInput.error_list.description,
        ];  
    }
    
    return (
        <div className='w-full shadow-2xl p-6'>
            <h1 className='text-3xl pt-3 pb-8 font-medium'>Add Category</h1>

            <form onSubmit={submitCategory} id='CATEGORY_FORM'>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category Name</label>
                    <input type="text" onChange={handleInput} value={categoryInput.name} name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{display_errors[0]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
                    <input type="text" onChange={handleInput} value={categoryInput.slug} name="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{display_errors[1]}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea name='description' onChange={handleInput} value={categoryInput.description} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
                    <p className='my-1 text-red-500'>{display_errors[2]}</p>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input type="checkbox" onChange={handleInput} value={categoryInput.status} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-900">Status</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
}

export default Category