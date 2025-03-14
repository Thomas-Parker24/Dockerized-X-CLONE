import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  PageNotFoundComponent,
  UnderConstructionComponent,
} from '../Common/Components';
import { UserProfile, UserRegister } from '../Users/Components/index';
import { Feed } from '../Home/Components';
import { LogInComponent, LogOutComponent } from '../LogIn/Components/index';
import { PrivateRouter } from './PrivateRoute';
import { PublicRouter } from './PublicRoute';
import ViewPost from '../Posts/Components/ViewPost';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
    errorElement: <PageNotFoundComponent />,
    children: [
      { path: 'profile/:userName', element: <UserProfile /> },
      { path: 'feed', element: <Feed /> },
      { path: 'underConstruction', element: <UnderConstructionComponent /> },
      { path: 'post/:id', element: <ViewPost /> },
    ],
  },
  {
    path: 'notFound',
    element: <PageNotFoundComponent />,
  },
  {
    path: 'login',
    element: (
      <PublicRouter>
        <LogInComponent />
      </PublicRouter>
    ),
  },
  {
    path: 'logout',
    element: (
      <PrivateRouter>
        <LogOutComponent />
      </PrivateRouter>
    ),
  },
  {
    path: 'register',
    element: (
      <PublicRouter>
        <UserRegister />
      </PublicRouter>
    ),
  },
]);

export default routes;
