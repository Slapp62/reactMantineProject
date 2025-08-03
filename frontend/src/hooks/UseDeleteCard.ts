import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeListing } from '@/store/listingSlice';
import { RootState } from '@/store/store';
import { TJobListing } from '@/Types';
import { API_BASE_URL } from '@/config/api';
import { transformAxiosError, ApiError, NetworkError } from '@/types/errors';

export function useDeleteListing() {
  const dispatch = useDispatch();
  const globalListings = useSelector((state: RootState) => state.listingSlice.listings);

  const deletelisting = async (listing: TJobListing) => {
    // update API
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        toast.error('Please log in to delete listings');
        return;
      }
      const response = await axios.delete(`${API_BASE_URL}/api/listings/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: { listingId: listing._id }
      });
      console.log(response.data);

      if (response.status === 200) {
        // update Redux
        const thislisting = globalListings?.find(
          (globalListing) => globalListing._id === listing._id
        );
        dispatch(removeListing(thislisting!));
        toast.success(`listing deleted successfully`, { position: 'bottom-right' });
      }
    } catch (error: unknown) {
      const transformedError = transformAxiosError(error);
      
      if ('status' in transformedError) {
        const apiError = transformedError as ApiError;
        if (apiError.status === 401) {
          toast.error('Please log in to delete listings', { position: 'bottom-right' });
        } else if (apiError.status === 403) {
          toast.error('You do not have permission to delete this listing', { position: 'bottom-right' });
        } else if (apiError.status === 404) {
          toast.error('Listing not found', { position: 'bottom-right' });
        } else {
          toast.error(`Failed to delete listing: ${apiError.message}`, { position: 'bottom-right' });
        }
      } else {
        const networkError = transformedError as NetworkError;
        toast.error('Network error - please check your connection', { position: 'bottom-right' });
      }
      
      console.error('Error deleting listing:', transformedError);
    }
  };

  return deletelisting;
}
