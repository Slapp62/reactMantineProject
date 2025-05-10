import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Layout } from './components/Layout';
import AdminControls from './pages/Admin.pages';
import Error404 from './pages/404.pages';
import About from './pages/About.pages';
import { RegisterForm } from './pages/register.pages';
import { FavoriteCards } from './pages/Favorites.pages';
import { MyCards } from './pages/MyCards.pages';
import { FullCard } from './components/Cards/FullCard';
//import RouteGuard from './RouteGuard';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'about', element: <About/>},
      {path: 'admin', element: <AdminControls/>},
      {path: 'register', element: <RegisterForm/>},
      {path: 'favorites', element: <FavoriteCards/>},
      {path: 'myCards', element: <MyCards/>},
      {path: 'card-details/:id', element: <FullCard/>},
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
