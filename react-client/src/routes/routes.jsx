import Dashboard from '../components/admin/Dashboard';
import Products from '../components/admin/Products';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';

const routes = [
    { path: '/admin', exact: true, name:'Admin', },
    { path: 'dashboard', exact: true, name:'Dashboard', component: Dashboard },
    { path: 'products', exact: true, name:'Products', component: Products },
    { path: 'add-category', exact: true, name:'Category', component: Category },
    { path: 'edit-category/:id', exact: true, name:'EditCategory', component: EditCategory },
    { path: 'view-category', exact: true, name:'ViewCategory', component: ViewCategory },
];

export default routes;