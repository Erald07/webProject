import Dashboard from '../components/admin/Dashboard';
import Products from '../components/admin/Products';
// import { Navigate } from 'react-router-dom';

const routes = [
    { path: '/admin', exact: true, name:'Admin', },
    { path: 'dashboard', exact: true, name:'Dashboard', component: Dashboard },
    { path: 'products', exact: true, name:'Products', component: Products }
];

export default routes;