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
    });

    const [errorlist, setError] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        setCheckbox( {...checkbox, [e.target.name]: e.target.checked} );
    }

    const submitCategory = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('name', categoryInput.name);
        formData.append('slug', categoryInput.slug);
        formData.append('description', categoryInput.description);
        formData.append('status', checkbox.status ? '1' : '0');

        try{
            await axios.post(`/api/store-category`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {

                if(res.data.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setCategory({
                        ...categoryInput,
                        name: '',
                        slug: '',
                        description: '',
                      });
                    document.getElementById('CATEGORY_FORM').reset();
                    setError([]);
                    navigate('/admin/view-category');
                }
                else if(res.data.status === 400){
                    setError(res.data.errors);
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    }
    
    return (
        <div className='w-full shadow-2xl p-6'>
            <h1 className='text-3xl pt-3 pb-8 font-medium'>Add Category</h1>

            <form onSubmit={submitCategory} id='CATEGORY_FORM'>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category Name</label>
                    <input type="text" onChange={handleInput} value={categoryInput.name} name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.name}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
                    <input type="text" onChange={handleInput} value={categoryInput.slug} name="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.slug}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea name='description' onChange={handleInput} value={categoryInput.description} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
                    <p className='my-1 text-red-500'>{errorlist.description}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                    <input type='file' onChange={handleFileChange} name="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.photo}</p>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input name='status' type="checkbox" onChange={handleCheckbox} defaultChecked={checkbox.status === 1 ? true : false} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-900">Status</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
}

export default Category