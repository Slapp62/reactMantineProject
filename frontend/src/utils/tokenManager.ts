import { TDecodedToken } from '@/Types';
import {jwtDecode} from 'jwt-decode';

export const setToken = (token: string, rememberMe: boolean) => {
  localStorage.setItem('token', token);
  localStorage.setItem('loginTime', `${Date.now()}`);
  sessionStorage.setItem('refreshMarker', 'refreshMarker');
  if (rememberMe) {
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.setItem('rememberMe', 'false');
  }
};

export const usePersistToken = () => {
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const token = localStorage.getItem('token');

  // need refresh to ensure that login persists on refresh even after 1 hour
  const refreshMarker = sessionStorage.getItem('refreshMarker');

  // need login time to retain login on new browser start or new tab
  const loginTime = Number(localStorage.getItem('loginTime'));
  const now = Date.now();

  // user logged in and local token was set, but didnt select remember me, then closed browser or new tab
  if (!refreshMarker && !rememberMe && token && loginTime) {
    if (now - loginTime > 1000 * 60 * 60) {
      clearToken();
      return null;
    }
  }

  return token
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const clearToken = () => {
  localStorage.removeItem('rememberMe');
  localStorage.removeItem('token')
  localStorage.removeItem('loginTime');
  sessionStorage.removeItem('refreshMarker');
}

export const decodedToken = (token: string | null) => {
  try {
    if (token){
      const decoded : TDecodedToken = jwtDecode(token);
      if (decoded) {return decoded};
    }
  } catch (error) {
    console.error(error);
  }
  
}
