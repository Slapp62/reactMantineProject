import { cleanedUserData } from "@/hooks/getCleanedData";
import { RootState } from "@/store/store";
import { setUser, updateUser, clearUser } from "@/store/userSlice";
import { TUsers } from "@/Types";
import { editProfileSchema } from "@/validationRules/editProfile.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, FieldValues, set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useEditProfile = () => {
    const jumpTo = useNavigate();
    const {id} = useParams();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const [isSubmitting, setSubmitting] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const isAdminView = useSelector((state:RootState) => state.userSlice.isAdminView);
    const currentUser = useSelector((state:RootState) => state.userSlice.user);
    const allUsers = useSelector((state:RootState) => state.userSlice.allUsers);
    const paramsUser = allUsers?.find((account) => account._id === id);
        
    const userData = isAdminView ? paramsUser : currentUser;

    const {register, handleSubmit, reset, formState: {errors, isValid, isDirty}, trigger} = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(editProfileSchema),
        defaultValues: userData ? cleanedUserData(userData) : {},
    });
    

    useEffect(() => {
        if (userData) {
            const defaultUserValues = cleanedUserData(userData);
            reset(defaultUserValues)
        };
        
    }, [reset, userData])
   
    const onSubmit = async (data:FieldValues) => {

        if (!data.password) {
            delete data.password
        }
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        try {
            const response = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`, data);

            if (response.status === 200) {
                const updatedUser = response.data;

                // if not admin view, update the current user information
                if (!isAdminView) {
                    dispatch(setUser(updatedUser))
                }
                
                // update the user in the allUsers array regardless of admin view or not
                if (allUsers){
                    dispatch(updateUser(updatedUser))
                }
                reset(cleanedUserData(updatedUser));
                setDisabled(true);
                toast.success('Profile Updated Successfully!', {position: `bottom-right`});
            }
        } catch (error: any) {    
            toast.error(`Update Failed! ${error.message}`, {position: `bottom-right`});
        }
    }
    
    
    const updateBusinessStatus = async () => {
        const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const response = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`);
            if (response.status === 200){
                const updatedUser = response.data;
                setSubmitting(true);
                setTimeout(() => {
                    dispatch(updateUser(updatedUser));
                    toast.success('Account Status Updated');
                    setSubmitting(false);
                }, 2000);
            }
        } catch (error : any) {
            toast.error(`Account Status Update Failed! ${error.message}`, {position: `bottom-right`});
            if (error.response){
                toast.error(`Account Status Update Failed! ${error.response.data.message}`, {position: `bottom-right`});
            }
        }
    }

    const deleteUser = async () => {
        const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`);
            if (response.status === 200){
                !isAdminView ? dispatch(clearUser()) : jumpTo('/admin');
                toast.warning('Account Deleted.', {position: 'bottom-right'})
            }
        } catch (error : any) {
            toast.error(`Account Deletion Failed! ${error.message}`, {position: `bottom-right`});
        }
    }
    
    return {isSubmitting, isAdminView,userData, register, handleSubmit, onSubmit, trigger, errors, isDirty, isValid, isDisabled, setDisabled, updateBusinessStatus, isMobile, opened, open, close, deleteUser}
}