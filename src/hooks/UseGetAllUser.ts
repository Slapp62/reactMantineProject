import { RootState } from "@/store/store";
import { setAllUsers } from "@/store/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useGetAllUsers() {
    const dispatch = useDispatch();
    const allUsers = useSelector((state:RootState) => state.userSlice.allUsers);
    const isLoading = allUsers === null;

    useEffect(() => {
        if (allUsers !== null) {
            //users are already loaded in Redux
        } else {
                const loadUsers = async () => {
                try {
                    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                    axios.defaults.headers.common['x-auth-token'] = token;
                    const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
                    dispatch(setAllUsers(response.data));
                } catch (error : any) {
                    toast.error(error)
                }
            }
            loadUsers();
        }
        
    }, [allUsers]);

    return {allUsers, isLoading};
}  