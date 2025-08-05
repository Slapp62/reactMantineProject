import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/config/api';
import { setUser } from '@/store/authSlice';
import { getToken, handleBeforeUnload } from '@/utils/tokenManager';

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenHandler = async () => {
      const token = getToken();

      if (token !== null) {
        try {
          const userData = await axios.get(`${API_BASE_URL}/api/users/user`,{
            headers: { authorization: token },
          });
          
          dispatch(setUser(userData.data.user));
        } catch (error: any) {
          toast.error('Could not auto-login in. Please login again.', error.response.data);
        }
      }
    };

    // clear storage when browser closes if remember me was not chosen.
    window.addEventListener('beforeunload', handleBeforeUnload);
    tokenHandler();
  }, [dispatch]);
}
