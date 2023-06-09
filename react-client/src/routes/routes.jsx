import Dashboard from '../components/admin/Dashboard';
import ViewProduct from '../components/admin/product/ViewProduct';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import Product from '../components/admin/product/Product';
import User from '../components/admin/user/User';
import ViewUser from '../components/admin/user/ViewUser';
import EditProduct from '../components/admin/product/EditProduct';
import Order from '../components/admin/order/Order';
import ViewOrder from '../components/admin/order/ViewOrder';

const routes = [
    { path: '/admin', exact: true, name:'Admin' },
    { path: 'dashboard', exact: true, name:'Dashboard', component: Dashboard },
    { path: 'view-product', exact: true, name:'ViewProducts', component: ViewProduct },
    { path: 'edit-product/:id', exact: true, name:'EditProduct', component: EditProduct },
    { path: 'add-product', exact: true, name:'Product', component: Product },
    { path: 'add-category', exact: true, name:'Category', component: Category },
    { path: 'edit-category/:id', exact: true, name:'EditCategory', component: EditCategory },
    { path: 'view-category', exact: true, name:'ViewCategory', component: ViewCategory },
    { path: 'view-user', exact: true, name:'ViewUser', component: ViewUser },
    { path: 'add-user', exact: true, name:'User', component: User },
    { path: 'orders', exact: true, name:'Order', component: Order },
    { path: 'view-order/:id', exact: true, name:'ViewOrder', component: ViewOrder },
];

export default routes;