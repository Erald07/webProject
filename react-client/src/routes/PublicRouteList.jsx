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
import Review from "../components/frontend/collections/review/Review";
import Checkout from '../components/frontend/Checkout';
import PersonalInformation from '../components/frontend/PersonalInformation';
import SearchResults from "../components/frontend/SearchResult";
import ThankYou from "../components/frontend/ThankYou";

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
    { path: 'all-product', exact: true, name:'Home', component: Home },
    { path: 'getAllReview', exact: true, name:'AllReview', component: Review },
    { path: 'checkout', exact: true, name:'Checkout', component: Checkout },
    { path: 'personal-information', exact: true, name:'PersonalInformation', component: PersonalInformation },
    { path: 'search', exact: true, name: 'SearchResult', component: SearchResults},
    { path: 'thank-you', exact: true, name: 'ThankYou', component: ThankYou}
];

export default publicrouteslist;