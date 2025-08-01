import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/config/api';
import { setUser } from '@/store/authSlice';
import { TDecodedToken } from '@/Types';

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenHandler = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (token !== null) {
        try {
          const decodedToken = jwtDecode<TDecodedToken>(token);
          const id = decodedToken.userId;

          axios.defaults.headers.common.Authorization = token;
          const userData = await axios.get(`${API_BASE_URL}/api/users/${id}`);

          dispatch(setUser(userData.data.user));
        } catch (error: any) {
          toast.error('Could not auto-login in. Please login again.', error.response.data);
        }
      }
    };

    // clear storage when browser closes if remember me was not chosen.
    const handleBeforeUnload = () => {
      const rememberMe = localStorage.getItem('rememberMe');
      if (!rememberMe) {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    tokenHandler();
  }, [dispatch]);
}
