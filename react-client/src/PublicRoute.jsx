import React from 'react'
// import { Route } from 'react-router-dom';
import FrontendLayout from './layouts/frontend/FrontendLayout';

function PublicRoute({...rest}) {
    return (
        <FrontendLayout /> 
    );
}

export default PublicRoute;