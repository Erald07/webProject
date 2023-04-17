import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminPrivateRoute({...rest}) {

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/checkingAuthenticated`).then(res => {
            if(res.status === 200){
                setAuthenticated(true);
            }
            setLoading(false);
        });
        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryIterceptor(err) {
        if(err.response.status === 401){
            Swal.fire({
                icon: 'warning',
                title: 'Unauthorized',
                text: err.response.data.message,
            });
            navigate('/')
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
        }, function(error) {
            if(error.response.status === 403){ //Access Denied
                Swal.fire({
                    icon: 'warning',
                    title: 'Forbidden',
                    text: error.response.data.message,
                });
                navigate('/403')
            }
            else if(error.response.status === 404){ //Page not found
                Swal.fire({
                    icon: 'warning',
                    title: '404 Error',
                    text: "URL / Page not found",
                });
                navigate('/404')
            }
            return Promise.reject(error);
        }
    );

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <Routes>
            <Route {...rest} 
                element={ 
                    Authenticated ? 
                    ( <MasterLayout />) :
                    ( <Navigate to="/login" replace /> )
                }
            />
        </Routes>
    )
}

export default AdminPrivateRoute;