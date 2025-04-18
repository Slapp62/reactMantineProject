import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Layout } from './components/Layout';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      // {path: 'about', element: <h1>About</h1>}
    ]
  },
  
],
  {
    basename: '/reactMantineProject',
  });

export function Router() {
  return <RouterProvider router={router} />;
}
