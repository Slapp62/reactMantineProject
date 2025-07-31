import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useCurrentUser = () => 
  useSelector((state: RootState) => state.authSlice.currentUser);

export const useIsLoggedIn = () => 
  useSelector((state: RootState) => state.authSlice.isLoggedIn);

export const useListings = () => 
  useSelector((state: RootState) => state.listingSlice.listings);

export const useJobseekerProfile = () => 
  useSelector((state: RootState) => state.jobseekerSlice.profile);

export const useIsBusiness = () => {
  const user = useCurrentUser();
  return user?.userType === 'business';
};

export const useIsAdmin = () => {
  const user = useCurrentUser();
  return user?.userType === 'admin';
};