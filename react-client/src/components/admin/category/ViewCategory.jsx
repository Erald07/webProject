import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-category`).then(res => {
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

        axios.delete(`/api/delete-category/${id}`).then( res => {
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
                <tr key={category.id} className='text-center border-b-2 border-gray-300 last-of-type:border-none'>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>{category.status}</td>
                    <td className='flex justify-center space-x-5'>
                        <Link to={`/admin/edit-category/${category.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>Edit</Link>
                        <button onClick={(e) => deleteCategory(e, category.id)} className='py-1 px-2 text-lg font-base bg-pink-700 text-white rounded-lg'>Delete</button>
                    </td>
                </tr>
            )
        })
    }
    
    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>View Category</h1>
                <Link to={'/admin/add-category'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-md h-fit py-2 mt-6'>Add Category</Link>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr className='text-center'>
                            <th scope="col" className="px-6 py-3">
                                Category ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
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