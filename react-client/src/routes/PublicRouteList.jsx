import Page403 from "../components/error/Page403";
import Page404 from "../components/error/Page404";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import ViewProduct from "../components/frontend/collections/ViewProduct";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import Cart from "../components/frontend/Cart";

const publicrouteslist = [
    { path: '/', exact: true, name:'Home', component: Home },
    { path: 'about', exact: true, name:'About', component: About },
    { path: 'contact', exact: true, name:'Contact', component: Contact },
    { path: '403', exact: true, name:'Page403', component: Page403 },
    { path: '404', exact: true, name:'Page404', component: Page404 },
    { path: 'login', exact: true, name:'Login', component: Login },
    { path: 'register', exact: true, name:'Register', component: Register },
    { path: 'collections', exact:true, name:'ViewCategory', component: ViewCategory },
    { path: 'collections/:product_slug', exact:true, name:'ViewProduct', component: ViewProduct },
    { path: 'collections/:category_slug/:product_slug', exact:true, name:'ProductDetail', component: ProductDetail },
    { path: 'cart', exact:true, name:'Cart', component: Cart },
];

export default publicrouteslist;