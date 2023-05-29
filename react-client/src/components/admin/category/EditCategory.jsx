import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../frontend/collections/Style.css';

function EditCategory(props) {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        description: '',
    });

    const [error, setError] = useState([]);
    const [picture, setPicture] = useState(null);

    useEffect( () => {

        axios.get(`/api/edit-category/${id}`).then( res => {
            if(res.data.status === 200){
                setCategory(res.data.category);
                setCheckbox(res.data.category);
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.message,
                });
                navigate('/admin/view-category');
            }
            setLoading(false);
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]);
    }

    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', picture);
        formData.append('name', categoryInput.name);
        formData.append('slug', categoryInput.slug);
        formData.append('description', categoryInput.description);
        formData.append('status', checkbox.status ? '1' : '0');
        
        try{
            axios.post(`/api/update-category/${id}`, formData, {
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
                    setError([]);
                    navigate('/admin/view-category');
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
                    navigate('admin/view-category');
                }
            });
        }
        catch(error) {
            console.log(error)
        }
    }

    if(loading){
        return  <div className="loader"></div>
    }

    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>Edit Category</h1>
                <Link to={'/admin/view-category'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-md h-fit py-2 mt-6'>Back</Link>
            </div>
            <form onSubmit={updateCategory}>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category Name</label>
                    <input type="text" onChange={handleInput} value={categoryInput.name} name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{error.name}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
                    <input type="text" onChange={handleInput} value={categoryInput.slug} name="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{error.slug}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea name='description' onChange={handleInput} value={categoryInput.description} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
                    <p className='my-1 text-red-500'>{error.description}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                    <input type='file' onChange={handleFileChange} name="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <img src={`http://localhost:8000/${categoryInput.photo}`} alt={categoryInput.photo} className='w-32' />
                    <p className='my-1 text-red-500'>{error.photo}</p>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input name='status' type="checkbox" onChange={handleCheckbox} defaultChecked={checkbox.status === 1 ? true : false} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-900">Status</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
            </form>
        </div>
    )
}

export default EditCategory