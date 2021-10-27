import Dashboard from './pages/dashboard';
import SignIn from './pages/login';
import SignUp from './pages/signUp';
import PageNotFound from './pages/pageNotFound';
import User from './pages/users';
import EditUser from './pages/users/editUser';

export const routes = [
  { path: '/admin/home', component: Dashboard },
  { path: '/admin/login', component: SignIn },
  { path: '/admin/signUp', component: SignUp },
  {
    path: '/admin/users',
    component: User,
  },
  {
    path: '/admin/user/edit',
    component: EditUser,
  },
  {
    path: '/*',
    component: PageNotFound,
  },
];
