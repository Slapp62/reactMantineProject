import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChooseAccountType } from '@/pages/ChooseAccountType';
import { JobSeekerForm } from '@/pages/JobSeekerForm.pages';
import Error404 from '../pages/404.pages';
import About from '../pages/About.pages';
import AdminControls from '../pages/AdminControls/AdminControls.pages';
import { BusinessForm } from '../pages/BusinessForm.pages';
import { CardDetails } from '../pages/CardDetails.pages';
import { CreateCard } from '../pages/CreateListing.pages';
import { EditCard } from '../pages/EditCard.pages';
import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { FavoriteListings } from '../pages/Favorites.pages';
import { HomePage } from '../pages/Home.pages';
import { LoginPage } from '../pages/LoginPage/Login.pages';
import { MyCards } from '../pages/MyListings.pages';
import { Layout } from './Layout';
import RouteGuard from './RouteGuard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'about', element: <About /> },
        { path: 'register', element: <ChooseAccountType /> },
        { path: 'register/jobseeker/', element: <JobSeekerForm /> },
        { path: 'register/business/', element: <BusinessForm /> },
        { path: 'card-details/:id', element: <CardDetails /> },
        { path: 'edit-card/:id', element: <EditCard /> },
        {
          path: 'favorites',
          element: (
            <RouteGuard>
              <FavoriteListings />
            </RouteGuard>
          ),
        },
        {
          path: 'create-card',
          element: (
            <RouteGuard>
              <CreateCard />
            </RouteGuard>
          ),
        },
        {
          path: 'edit-profile/:id',
          element: (
            <RouteGuard>
              <EditProfile />
            </RouteGuard>
          ),
        },
        {
          path: 'admin',
          element: (
            <RouteGuard isAdmin>
              <AdminControls />
            </RouteGuard>
          ),
        },
        {
          path: 'my-listings',
          element: (
            <RouteGuard isBusiness>
              <MyCards />
            </RouteGuard>
          ),
        },
        { path: '*', element: <Error404 /> },
      ],
    },
  ],
  {
    basename: '/',
  }
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
