import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeListing } from '@/store/listingSlice';
import { RootState } from '@/store/store';
import { TJobListing } from '@/Types';

export function useDeleteListing() {
  const dispatch = useDispatch();
  const globalListings = useSelector((state: RootState) => state.listingSlice.listings);

  const deletelisting = async (listing: TJobListing) => {
    // update API
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      axios.defaults.headers.common['x-auth-token'] = token;
      const response = await axios.delete('https://localhost:5000/listings/delete');
      console.log(response.data);

      if (response.status === 200) {
        // update Redux
        const thislisting = globalListings?.find(
          (globalListing) => globalListing._id === listing._id
        );
        dispatch(removeListing(thislisting!));
        toast.success(`listing deleted successfully`, { position: 'bottom-right' });
      }
    } catch (error: any) {
      toast.error(`Error deleting listing: ${error}`, { position: 'bottom-right' });
    }
  };

  return deletelisting;
}
