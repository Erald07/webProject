import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewUser() {

    const [loading, setLoading] = useState(true);
    const [userlist, setUserlist] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-user`).then(res => {
            if(res.data.status === 200){
                setUserlist(res.data.user);
            }
            setLoading(false);
        });
    }, []);

    const deleteUser = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-user/${id}`).then( res => {
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
    var viewUser_table = '';
    if(loading){
        return <h4>Loading User...</h4>
    }
    else{
        viewUser_table = userlist.map( (user) => {
            return(
                <tr key={user.id}>
                    <td className='px-4'>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td><Link to={`/admin/edit-user/${user.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>Edit</Link></td>
                    <td><button onClick={(e) => deleteUser(e, user.id)} className='py-1 px-2 text-lg font-base bg-pink-700 text-white rounded-lg'>Delete</button></td>
                </tr>
            )
        })
    }
    
    return (
        <div className='w-full shadow-2xl p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl pt-3 pb-8 font-medium'>View User</h1>
                <Link to={'/admin/add-user'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-md h-fit py-2 mt-6'>Add User</Link>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-200'>
                        {viewUser_table}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ViewUser;