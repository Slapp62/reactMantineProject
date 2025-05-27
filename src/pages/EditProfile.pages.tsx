import { TUsers } from "@/Types";
import { Button, Fieldset, Flex, Image, TextInput, Title, Text } from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, FieldValues,} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";
import { editProfileSchema } from "@/validationRules/editProfile.joi";
import { clearUser, setUser, updateAccountStatus } from "@/store/userSlice";
import { useCleanedUserData } from "@/hooks/CleanedUserData";
import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";

export function EditProfile() {    
    const {id} = useParams();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const reduxUser = useSelector((state:RootState) => state.userSlice.user);
    const allUsers = useSelector((state:RootState) => state.userSlice.allUsers);
    const isAdmin = useSelector((state:RootState) => state.userSlice.user?.isAdmin);
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const cleanedUserData = useCleanedUserData();
    
    const user = isAdmin ? allUsers?.find((user) => user._id === id)
        : reduxUser;

    const {register, handleSubmit, reset, formState: {errors, isValid, isDirty}, } = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(editProfileSchema),
        defaultValues: user ? cleanedUserData(user) : {},
    });

    useEffect(() => {
        if (user) {
            const defaultUserValues = cleanedUserData(user);
            reset(defaultUserValues);
        };
    }, [reset, user])
    
    const onSubmit = async (data:FieldValues) => {
        if (!data.password) {
            delete data.password
        }
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        try {
            const response = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, data)

            if (response.status === 200) {
                toast.success('Profile Updated Successfully!', {position: `bottom-right`});

                const updatedUser = response.data;
                dispatch(setUser(updatedUser));
                reset(cleanedUserData(updatedUser));
                setDisabled(true);
            }
        } catch (error: any) {    
            toast.error(`Update Failed! ${error.message}`, {position: `bottom-right`});
        }
    }
    
    const updateBusinessStatus = async () => {
        const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const response = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user?._id}`)
            if (response.status === 200){
                dispatch(updateAccountStatus(!user?.isBusiness))
                toast.success('Account Status Updated', {position: 'bottom-right'})
            }
        } catch (error : any) {
            toast.error(`Account Status Update Failed! ${error.message}`, {position: `bottom-right`});
        }
    }

    const deleteUser = async () => {
        const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user?._id}`)
            if (response.status === 200){
                if (!isAdmin) {dispatch(clearUser())};
                toast.warning('Account Deleted.', {position: 'bottom-right'})
            }
        } catch (error : any) {
            toast.error(`Account Deletion Failed! ${error.message}`, {position: `bottom-right`});
        }
    }

    return(
        <Flex mt={20} direction='column' align='center' gap={20} >
            <Title>Edit Profile</Title>

            <Flex justify='center' direction="column" style={{width: isMobile ? '90%' : '50%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={10} direction='column' m='auto'>
                        <Fieldset legend='Name'>
                            <TextInput
                                label='First'
                                disabled={isDisabled}
                                {...register('name.first')}
                                error= {errors.name?.first?.message}
                            />
                            <TextInput
                                label='Middle'
                                disabled={isDisabled}
                                {...register('name.middle')}
                                error={errors.name?.middle?.message}
                            />
                            <TextInput
                                label='Last'
                                disabled={isDisabled}
                                {...register('name.last')}  
                                error={errors.name?.last?.message}
                            /> 
                        </Fieldset>

                        <Fieldset legend='Address'>
                            <TextInput
                                label='Country'
                                disabled={isDisabled}
                                {...register('address.country')}
                                error={errors.address?.country?.message}
                            />
                            <TextInput
                                label='State'
                                disabled={isDisabled}
                                {...register('address.state')}
                                error={errors.address?.state?.message}
                            />
                            <TextInput
                                label='City'
                                disabled={isDisabled}
                                {...register('address.city')}
                                error={errors.address?.city?.message}
                            />
                            <TextInput
                                label='Street'
                                disabled={isDisabled}
                                {...register('address.street')}
                                error={errors.address?.street?.message}
                            />
                            <TextInput
                                label='House Number'
                                disabled={isDisabled}
                                {...register('address.houseNumber', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');},
                                })}
                                error={errors.address?.houseNumber?.message}
                            />
                            <TextInput
                                label='Zipcode'
                                disabled={isDisabled}
                                {...register('address.zip', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '')},
                                })}
                                error={errors.address?.zip?.message}
                            />
                        </Fieldset>

                        <Fieldset legend="Contact">
                            <TextInput
                                rightSection={<IconPhone/>} 
                                label='Phone'
                                disabled={isDisabled}
                                required
                                {...register('phone', {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^\d-]/g, '')},
                                })}
                                error={errors.phone?.message}
                            />
                        </Fieldset> 

                        <Fieldset legend="Image">
                            <Image
                                src={user?.image?.url}
                                h={100}
                                w={100}
                                mt={10}
                                m="auto"
                            />
                            <TextInput
                                label="New URL"
                                disabled={isDisabled}
                                {...register('image.url')}
                                error={errors.image?.url?.message}
                            />
                            <TextInput
                                label="New Image Alt"
                                disabled={isDisabled}
                                {...register('image.alt')}
                                error={errors.image?.alt?.message}
                            />
                        </Fieldset>

                        <Fieldset legend="Change Account Type">
                            <Flex align="center" direction="column" gap={5}>
                                <Text>Account Type: {user?.isBusiness ? <strong>Business User</strong> : <strong>Regular User</strong>}</Text>
                                <Button disabled={isDisabled} onClick={() => updateBusinessStatus()}>
                                    {user?.isBusiness ? 
                                        <Text>Become A Regular User</Text> 
                                        : <Text>Become A Business User</Text>} 
                                </Button>
                            </Flex>
                        </Fieldset>

                        <Fieldset legend="Delete Account">
                            <Flex align="center" direction="column" gap={5}>
                                <Text fw='bold' c='red'>All data will be lost and you will be logged out.</Text>
                                <Button color='red' disabled={isDisabled} onClick={() => deleteUser()}>
                                    Delete Account</Button>
                            </Flex>
                        </Fieldset>
                        
                        <Flex direction="column" gap={5} w="50%" mx="auto">
                            
                            
                            {isDisabled && 
                                <Button onClick={() => {
                                setDisabled(false);
                                }}
                                > Edit Profile</Button>}

                            <Button
                                disabled={!isValid || !isDirty}
                                type="submit"
                            > Update Info </Button>
                        </Flex>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}