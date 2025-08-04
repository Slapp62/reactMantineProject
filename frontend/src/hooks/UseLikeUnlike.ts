import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import '@/store/listingSlice';

import { toggleFavorites } from '@/store/jobseekerSlice';
import { getToken } from '@/utils/tokenManager';

export function useLikeUnlike() {
  const dispatch = useDispatch();

  const toggleLike = useCallback(
    async (listingId: string, isLiked: boolean) => {
      try {
        const token = getToken();

        await axios.put(
          `http://localhost:5000/api/users/favorites/toggle/${listingId}`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );

        dispatch(toggleFavorites(listingId));

        if (isLiked) {
          // now unliked
          toast.warning('Listing Unliked');
        } else {
          // if it was unliked, now liked
          toast.success('Listing Liked');
        }
      } catch (error: any) {
        toast.error(`Error liking/unliking Listing`);
        console.error('Error:', error.response.data);
      }
    },
    [dispatch]
  );

  return toggleLike;
}
