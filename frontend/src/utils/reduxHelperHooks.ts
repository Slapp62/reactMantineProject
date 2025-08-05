import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

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
export const useListingLoading = () => useSelector((state: RootState) => state.listingSlice.loading);
