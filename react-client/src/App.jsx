import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import Header from './components/frontend/navbar/Header';
import Page403 from './components/error/Page403';
import Page404 from './components/error/Page404';
import AdminPrivateRoute from './AdminPrivateRoute';
import MasterLayout from './layouts/admin/MasterLayout';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import routes from './routes/routes';

axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <Router>
            <Routes>

                <Route exact path='/' element={<Header />} />

                <Route exact path='/403' element={<Page403 />} />
                <Route exact path='/404' element={<Page404 />} />

                <Route path='/login' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Login />} />
                <Route path='/register' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Register />} />    

                {/* <Route path="/admin" element={<MasterLayout />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<Products />} /> */}

                {/* <Route path='/admin' name="Admin" render={(props) => <MasterLayout {...props} />} /> */}
                {/* <Route path="/admin/" element={<MasterLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                </Route> */}
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin/*" element={<MasterLayout routes={routes} />} />
                {/* <AdminPrivateRoute path="/admin" name="Admin"  /> */}
                {/* <Route path="/admin/*" element={<AdminPrivateRoute />} /> */}

            </Routes>
        </Router>
    );
}

export default App;
