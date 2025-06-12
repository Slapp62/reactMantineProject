import { setUser } from "@/store/userSlice";
import { TdecodedToken} from "@/Types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStayLoggedIn = () => {
    useEffect(() => {
        const dispatch = useDispatch();
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (token === null) {return;}
        
        axios.defaults.headers.common['x-auth-token'] = token;

        const { _id } = jwtDecode<TdecodedToken>(token);

        const dispatchUser = async () => {
            const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${_id}`)
            const userData = await response.data;
            dispatch(setUser(userData.data)); 
        }
        dispatchUser();
    }, [])
}

export default useStayLoggedIn