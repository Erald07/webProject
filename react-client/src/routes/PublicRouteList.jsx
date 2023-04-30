import Page403 from "../components/error/Page403";
import Page404 from "../components/error/Page404";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";

const publicrouteslist = [
    { path: '/', exact: true, name:'Home', component: Home },
    { path: 'about', exact: true, name:'About', component: About },
    { path: 'contact', exact: true, name:'Contact', component: Contact },
    { path: '403', exact: true, name:'Page403', component: Page403 },
    { path: '404', exact: true, name:'Page404', component: Page404 },
    { path: 'login', exact: true, name:'Login', component: Login },
    { path: 'register', exact: true, name:'Register', component: Register },

];

export default publicrouteslist;