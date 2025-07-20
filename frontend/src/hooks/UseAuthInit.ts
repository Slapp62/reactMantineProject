import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from "@/store/userSlice";
import { TDecodedToken } from "@/Types";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
                    const userData = await axios.get(`http://localhost:5000/api/users/${id}`)
                    
                    dispatch(setUser(userData.data.user))
                } catch (error : any) {
                    toast.error('Could not auto-login in. Please login again.', error.response.data)
                }
            }
        }

        // clear storage when browser closes if remember me was not chosen.
        const handleBeforeUnload = () => {
            const rememberMe = localStorage.getItem('rememberMe');
            if (!rememberMe) {
                localStorage.removeItem('token');
                localStorage.removeItem('rememberMe');
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);
        tokenHandler();
    }, [dispatch])
}