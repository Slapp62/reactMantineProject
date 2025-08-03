import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/config/api';
import { setUser } from '@/store/authSlice';
import { TDecodedToken } from '@/Types';
import { transformAxiosError, isApiError, isNetworkError } from '@/types/errors';
import { TokenManager } from '@/utils/tokenManager';

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenHandler = async () => {
      const token = TokenManager.getTokenIfValid();

      if (token) {
        try {
          const decodedToken = jwtDecode<TDecodedToken>(token);
          const id = decodedToken.userId;

          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const userData = await axios.get(`${API_BASE_URL}/api/users/${id}`);

          dispatch(setUser(userData.data.user));
        } catch (error: unknown) {
          const transformedError = transformAxiosError(error);
          
          if (isNetworkError(transformedError)) {
            toast.error('Network error. Please check your connection and try again.');
          } else if (isApiError(transformedError)) {
            if (transformedError.status === 401 || transformedError.status === 403) {
              // Token expired or invalid
              TokenManager.removeToken();
              toast.error('Session expired. Please login again.');
            } else {
              toast.error(transformedError.message || 'Could not auto-login. Please login again.');
            }
          } else {
            toast.error('Could not auto-login. Please login again.');
          }
        }
      }
    };

    tokenHandler();
  }, [dispatch]);
}
