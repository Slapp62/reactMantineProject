import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChooseAccountType } from '@/pages/ChooseAccountType';
//import AdminControls from '../pages/AdminControls/AdminControls.pages';
import { BusinessForm } from '@/pages/RegisterPages/BusinessForm.pages';
import { JobSeekerForm } from '@/pages/RegisterPages/JobSeekerForm.pages';
import Error404 from '../pages/404.pages';
import About from '../pages/About.pages';
import { lazy, Suspense } from 'react';
// import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { FavoriteListings } from '../pages/Favorites.pages';
import { HomePage } from '../pages/Home.pages';
import { ListingDetails } from '../pages/ListingDetails.pages';
import { LoginPage } from '../pages/LoginPage/Login.pages';
import { Layout } from './Layout';
import RouteGuard from './RouteGuard';
import { CustomLoader } from '@/components/CustomLoader';

const CreateCard = lazy(() => import('../pages/CreateListing.pages'));
const EditListing = lazy(() => import('../pages/EditListing.pages'));
const MyListings = lazy(() => import('../pages/MyListings.pages'));

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
        { path: 'listing-details/:id', element: <ListingDetails /> },
        { 
          path: 'edit-listing/:id', 
          element: 
            <Suspense fallback={<CustomLoader />}>
              <EditListing />
            </Suspense> },
        {
          path: 'favorites',
          element: (
            <RouteGuard>
              <FavoriteListings />
            </RouteGuard>
          ),
        },
        {
          path: 'create-listing',
          element: (
            <RouteGuard>
              <Suspense fallback={<CustomLoader />}>
                <CreateCard />
              </Suspense>
            </RouteGuard>
          ),
        },
        // {
        //   path: 'edit-profile/:id',
        //   element: (
        //     <RouteGuard>
        //       <EditProfile />
        //     </RouteGuard>
        //   ),
        // },
        // {
        //   path: 'admin',
        //   element: (
        //     <RouteGuard isAdmin>
        //       <AdminControls />
        //     </RouteGuard>
        //   ),
        // },
        {
          path: 'my-listings',
          element: (
            <RouteGuard isBusiness>
              <Suspense fallback={<CustomLoader />}>
                <MyListings />
              </Suspense>
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
