import { TUsers } from "@/Types";
import { Button, Fieldset, Flex, Image, TextInput, Title, Text, Modal, Group } from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, FieldValues} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { editProfileSchema } from "@/validationRules/editProfile.joi";
import { clearUser, setUser, updateAccountStatus, updateUser } from "@/store/userSlice";
import { useCleanedUserData } from "@/hooks/CleanedUserData";
import { RootState } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";


export function EditProfile() {
    const jumpTo = useNavigate();
    const {id} = useParams();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const cleanedUserData = useCleanedUserData();

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
        const defaultUserValues = userData ? cleanedUserData(userData) : {};
        reset(defaultUserValues);
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
                toast.success('Profile Updated Successfully!', {position: `bottom-right`});

                const updatedUser = response.data;
                {!isAdminView && dispatch(setUser(updatedUser))}
                if (allUsers){
                    dispatch(updateUser(updatedUser))
                }
                reset(cleanedUserData(updatedUser));
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
                dispatch(updateAccountStatus(!userData?.isBusiness));
                toast.success('Account Status Updated', {position: 'bottom-right'});
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

    return(
        <>
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
                                required
                                disabled={isDisabled}
                                {...register('address.houseNumber', {
                                    onChange: (e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                    },
                                })}
                                error= {errors.address?.houseNumber?.message}
                                />
                                <TextInput 
                                label='Zipcode' 
                                disabled={isDisabled}
                                {...register('address.zip', {
                                    onChange: (e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                    },
                                })}
                                error= {errors.address?.zip?.message}
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
                                    src={userData?.image?.url}
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
                                <Flex align="center" direction="column" justify="center" gap={10}>
                                    <Text>Account Type: {userData?.isBusiness ? <strong>Business User</strong> : <strong>Regular User</strong>}</Text>
                                    <Button size="xs" disabled={isDisabled} onClick={() => updateBusinessStatus()}>
                                        <Text fz="sm">Change</Text> 
                                    </Button>
                                </Flex>
                            </Fieldset>

                            {userData?.isAdmin === false && isAdminView === false &&
                            <Fieldset legend="Delete Account">
                                <Flex align="center" direction="column" gap={5}>
                                    <Text fw='bold' c='red'>All data will be lost and you will be logged out.</Text>
                                    <Button color='red' disabled={isDisabled} onClick={open}>
                                        Delete Account</Button>
                                </Flex>
                            </Fieldset>}
                            
                            <Flex direction="column" gap={5} w="50%" mx="auto">
                                
                                
                                {isDisabled && 
                                    <Button onClick={() => {
                                    setDisabled(false);
                                    trigger();
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

            <Modal centered opened={opened} onClose={close} title="Confirmation">
                <Text>Are you sure you want to delete your account?</Text>
                <Group mt={20} justify="center">
                    <Button color="red" onClick={deleteUser}>Yes, Delete It</Button>
                    <Button variant="outline" onClick={close}>No, I'll Stay</Button>
                </Group>
            </Modal>
        </> 
    )
}