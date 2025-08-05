import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeListing } from '@/store/listingSlice';
import { TJobListing } from '@/Types';
import { getToken } from '@/utils/tokenManager';
import { API_BASE_URL } from '@/config/api';

export function useDeleteListing() {
  const dispatch = useDispatch();

  const deletelisting = async (listing: TJobListing) => {
    // update API
    try {
      const token = getToken();
      const response = await axios.delete(`${API_BASE_URL}/api/listings/delete/${listing._id}`, {
        headers: { authorization: token },
      });

      if (response.status === 204) {
        // update Redux
        dispatch(removeListing(listing));
        toast.success(`listing deleted successfully`, { position: 'bottom-right' });
        console.log('delete successful', response.status);
        
      }
    } catch (error: any) {
      toast.error(`Error deleting listing: ${error}`, { position: 'bottom-right' });
    }
  };

  return deletelisting;
}
