import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const reduxHelpers = {
  useCurrentUser: () => useSelector((state: RootState) => state.authSlice.currentUser),
  useIsLoggedIn: () => useSelector((state: RootState) => state.authSlice.isLoggedIn),
  useIsJobseeker: () => {
    return useSelector((state: RootState) => state.authSlice.currentUser?.userType === 'jobseeker');
  },
  useIsBusiness: () => {
    return useSelector((state: RootState) => state.authSlice.currentUser?.userType === 'business');
  },
  useIsAdmin: () => {
    return useSelector((state: RootState) => state.authSlice.currentUser?.userType === 'admin');
  },

  useJobseekerProfile: () => useSelector((state: RootState) => state.jobseekerSlice.profile),
  
  useListings: () => useSelector((state: RootState) => state.listingSlice.listings),
  useListingById: (id: string | undefined) => 
    useSelector((state: RootState) => state.listingSlice.listings?.find((listing) => listing._id === id)),
  useBusinessListings: () => useSelector((state: RootState) => state.businessSlice.businessListings),
  useListingLoading: () => useSelector((state: RootState) => state.listingSlice.loading),
};

// auth slice helpers
export const useCurrentUser = () => useSelector((state: RootState) => state.authSlice.currentUser);
export const useIsLoggedIn = () => useSelector((state: RootState) => state.authSlice.isLoggedIn);

export const useIsJobseeker = () => {
  const user = useCurrentUser();
  return user?.userType === 'jobseeker';
};

export const useIsBusiness = () => {
  const user = useCurrentUser();
  return user?.userType === 'business';
};

export const useIsAdmin = () => {
  const user = useCurrentUser();
  return user?.userType === 'admin';
};

// jobseeker slice helpers
export const useJobseekerProfile = () => useSelector((state: RootState) => state.jobseekerSlice.profile);

// listing slice helpers
export const useListings = () => useSelector((state: RootState) => state.listingSlice.listings);
export const useListingById = (id: string) => 
  useSelector((state: RootState) => state.listingSlice.listings?.find((listing) => listing._id === id));

export const useListingLoading = () => useSelector((state: RootState) => state.listingSlice.loading);

// business slice helpers
export const useBusinessListings = () => useSelector((state: RootState) => state.businessSlice.businessListings);