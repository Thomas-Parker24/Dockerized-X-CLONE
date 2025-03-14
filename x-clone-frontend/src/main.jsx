import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/routes.jsx';
import { LogInProvider } from './LogIn/Context';
import { PostsProvider } from './Posts/Context/index.js';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <LogInProvider>
    <PostsProvider>
      <Toaster richColors />
      <RouterProvider router={routes} />
    </PostsProvider>
  </LogInProvider>
);
