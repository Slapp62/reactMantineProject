import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/config/api';
import { setUser } from '@/store/authSlice';
import { decodedToken, usePersistToken } from '@/utils/tokenManager';
import { TDecodedToken } from '@/Types';

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const tokenHandler = async () => {

      const token = usePersistToken();
      const decoded: TDecodedToken  = decodedToken(token);
      if (token !== null) {
        try {
          const userData = await axios.get(`${API_BASE_URL}/api/users/user/${decoded?.userId}`,{
            headers: { authorization: token },
          });
          
          dispatch(setUser(userData.data.user));

        } catch (error: any) {
          toast.error('Could not auto-login in. Please login again.', error.response.data);
          console.error(error);
        }
      }
    };
   
    tokenHandler();
  }, [dispatch]);
}
