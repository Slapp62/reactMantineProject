import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Layout } from './components/Layout';
import AdminControls from './pages/Admin.pages';
import Error404 from './pages/404.pages';
import About from './pages/About.pages';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'about', element: <About/>},
      {path: 'admin', element: <AdminControls/>},
      {path: '*', element: <Error404/>},
    ]
  },
  
],
  {
    basename: '/reactMantineProject',
  });

export function Router() {
  return <RouterProvider router={router} />;
}
