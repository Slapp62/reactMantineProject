import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from "@/store/userSlice";
import { TdecodedToken } from "@/Types";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
      const tokenHandler = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (token !== null) {
            try {
                const decodedToken = jwtDecode<TdecodedToken>(token);
                const id = decodedToken._id;

                axios.defaults.headers.common['x-auth-token'] = token;
                const userData = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)

                dispatch(setUser(userData.data))
            } catch (error : any) {
               toast.error('Could not auto-login in. Please login again.', error.response.data)
            }
        }
      }
      
      tokenHandler();
  }, [dispatch])
}