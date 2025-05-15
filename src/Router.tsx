import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.pages';
import { Layout } from './components/Layout';
import AdminControls from './pages/Admin.pages';
import Error404 from './pages/404.pages';
import About from './pages/About.pages';
import { RegisterForm } from './pages/asdf.pages';
import { FavoriteCards } from './pages/Favorites.pages';
import { MyCards } from './pages/MyCards.pages';
import { FullCard } from './components/Cards/FullCard';
import { LoginPage } from './pages/LoginPage/Login.pages';
import RouteGuard from './RouteGuard';
import { UserProfile } from './pages/UserProfile.pages';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage/>},
      {path: 'about', element: <About/>},
      {path: 'admin', element: <RouteGuard isAdmin><AdminControls/></RouteGuard> },
      {path: 'register', element: <RegisterForm/>},
      {path: 'favorites', element: <RouteGuard><FavoriteCards/></RouteGuard>},
      {path: 'mycards', element: <RouteGuard isBusiness><MyCards/></RouteGuard>},
      {path: 'card-details/:id', element: <FullCard/>},
      {path: 'user-profile', element: <RouteGuard><UserProfile/></RouteGuard>},
      {path: '*', element: <Error404/>},
    ]
  },
  
],
  {
    basename: '/',
  });

export function Router() {
  return <RouterProvider router={router} />;
}
