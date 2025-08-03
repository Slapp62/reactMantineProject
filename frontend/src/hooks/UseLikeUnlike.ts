import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { } from '@/store/listingSlice';
import { toggleFavorites } from '@/store/jobseekerSlice';
import { API_BASE_URL } from '@/config/api';
import { transformAxiosError, isApiError, isNetworkError } from '@/types/errors';

export function useLikeUnlike() {
  const dispatch = useDispatch();
    
  const toggleLike = useCallback(
    async (listingId: string, isLiked: boolean) => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        await axios.put(
          `${API_BASE_URL}/api/users/favorites/toggle/${listingId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        dispatch(toggleFavorites(listingId));

        if (isLiked){
          // now unliked 
          toast.warning('Listing Unliked')
        } else {
          // if it was unliked, now liked
          toast.success('Listing Liked')
        } 
      } catch (error: unknown) {
        const transformedError = transformAxiosError(error);
        
        if (isNetworkError(transformedError)) {
          toast.error('Network error - please check your connection');
        } else if (isApiError(transformedError)) {
          if (transformedError.status === 401) {
            toast.error('Please log in to like/unlike listings');
          } else if (transformedError.status === 404) {
            toast.error('Listing not found');
          } else {
            toast.error(transformedError.message || 'Error updating favorites');
          }
        } else {
          toast.error('Error liking/unliking listing');
        }
        console.error('Favorite toggle error:', transformedError);
      }
    },
    [dispatch]
  );

  return toggleLike;
}
