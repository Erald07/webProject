import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import Header from './components/frontend/navbar/Header';
import Page403 from './components/error/Page403';
import Page404 from './components/error/Page404';
import AdminPrivateRoute from './AdminPrivateRoute';

import PublicRoute from './PublicRoute';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<Header />} />

        <Route path='/*' element={<PublicRoute/>} />

        <Route path='/403' element={<Page403 />} />
        <Route path='/404' element={<Page404 />} />

        <Route path='/login' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Register />} />

        <Route path='/admin/*' element={<AdminPrivateRoute />} />

      </Routes>
    </Router>
  );
}

export default App;
