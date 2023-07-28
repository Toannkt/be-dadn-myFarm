import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import MyFarm from '../pages/MyFarm';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassword';

import config from '../config';

const publicRoutes = [
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
];

const privateRoutes = [
    { path: config.routes.myfarm, component: MyFarm },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.changepassword, component: ChangePassword },
];

const homeRoute = { path: config.routes.home, component: Home };
const loginRoute = { path: config.routes.login, component: Login };

export { publicRoutes, privateRoutes, loginRoute, homeRoute };
