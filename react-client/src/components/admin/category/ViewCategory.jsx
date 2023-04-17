import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/view-category`).then(res => {
            if(res.data.status === 200){
                setCategorylist(res.data.category);
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`http://localhost:8000/api/delete-category/${id}`).then( res => {
            if(res.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                });
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404){
                
            }
        })

    }
    var viewCategory_table = '';
    if(loading){
        return <h4>Loading Category...</h4>
    }
    else{
        viewCategory_table = categorylist.map( (category) => {
            return(
                <tr key={category.id}>
                    <td className='px-4'>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>{category.status}</td>
                    <td><Link to={`/admin/edit-category/${category.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>Edit</Link></td>
                    <td><button onClick={(e) => deleteCategory(e, category.id)} className='py-1 px-2 text-lg font-base bg-pink-700 text-white rounded-lg'>Delete</button></td>
                </tr>
            )
        })
    }
    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>View Category</h1>
                <Link to={'/admin/add-category'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-2xl h-12 pt-2'>Add Category</Link>
            </div>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Category ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category Slug
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-200'>
                        {viewCategory_table}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ViewCategory