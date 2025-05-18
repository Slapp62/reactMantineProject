import { RootState } from "@/store/store";
import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { Button, Fieldset, Flex, Image, PasswordInput, TextInput, Title } from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UserProfile() {
    const user = useSelector((state:RootState) => state.userSlice.user);
    const [disabled, setDisabled] = useState(true);
    const editRef = useRef<HTMLDivElement>(null);

    //const isMobile = useMediaQuery('(max-width: 700px)');

    const {
        register, 
        handleSubmit, 
        formState: {errors, isValid}, 
    }
         = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(registrationSchema),
        defaultValues: user || {},
    });

    const onSubmit = async (data:FieldValues) => {
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        
        try {
            const response = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user?._id}`, data)

            if (response.status === 201) {
                toast.success('Profile Updated Successfully!', {position: `bottom-right`});
            }
        } catch (error: any) {
            toast.error(`Update Failed! ${  error.message}`, {position: `bottom-right`});
        }
    }
    
    return(
        <Flex ref={editRef} mt={20} direction='column' align='center' gap={20}>

            <Title>User Profile</Title>

            <Flex justify='center' direction="column" w="40%">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Flex gap={10} direction='column' w='70%' m='auto'>

                        <Fieldset legend='Name'>
                            <TextInput
                                label='First'
                                disabled={disabled}
                                required
                                {...register('name.first')}
                                error= {errors.name?.first?.message}
                            />

                            <TextInput
                                label='Middle'
                                disabled={disabled}
                                {...register('name.middle')}
                                error={errors.name?.middle?.message}
                            />

                            <TextInput
                                label='Last'
                                disabled={disabled}
                                required
                                {...register('name.last')}  
                                error={errors.name?.last?.message}
                            /> 
                        </Fieldset>

                        <Fieldset legend='Address'>
                            <TextInput
                                label='Country'
                                disabled={disabled}
                                {...register('address.country')}
                                required
                                error={errors.address?.country?.message}
                            />

                            <TextInput
                                label='State'
                                disabled={disabled}
                                {...register('address.state')}
                                error={errors.address?.state?.message}
                            />

                            <TextInput
                                label='City'
                                disabled={disabled}
                                {...register('address.city')}
                                required
                                error={errors.address?.city?.message}
                            />

                            <TextInput
                                label='Street'
                                disabled={disabled}
                                {...register('address.street')}
                                required
                                error={errors.address?.street?.message}
                            />

                            <TextInput
                                label='House Number'
                                disabled={disabled}
                                {...register('address.houseNumber', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                                },
                                })}
                                required
                                error={errors.address?.houseNumber?.message}
                            />

                            <TextInput
                                label='Zipcode'
                                disabled={disabled}
                                {...register('address.zip', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                                },
                                })}
                                required
                                error={errors.address?.zip?.message}
                            />
                        </Fieldset>

                        <Fieldset legend="Credentials">
                            <TextInput
                                label='Email'
                                disabled={disabled}
                                {...register('email')}
                                required
                                error={errors.email?.message}
                            />

                            <PasswordInput
                                label='Password'
                                disabled={disabled}
                                {...register('password')}
                                required
                                error={errors.password?.message}
                            />
                        </Fieldset> 

                        <Fieldset legend="Other Details">
                            <TextInput
                                rightSection={<IconPhone/>} 
                                label='Phone'
                                disabled={disabled}
                                required
                                {...register('phone', {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^\d-]/g, '');
                                    },
                                })}
                                error={errors.phone?.message}
                            />
                            
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
                                    disabled={disabled}
                                    {...register('image.url')}
                                    error={errors.image?.url?.message}
                                />

                                <TextInput
                                    label="New Image Alt"
                                    disabled={disabled}
                                    {...register('image.alt')}
                                    error={errors.image?.alt?.message}
                                />
                            </Fieldset>
                        </Fieldset>

                        <Flex direction="column" gap={5} w="50%" mx="auto">
                            {!user?.isBusiness && <Button>Become a Business User</Button>}
                            {disabled && <Button onClick={() => {
                                setDisabled(false);
                                editRef.current?.scrollIntoView({behavior:'smooth'})}}
                                >
                                Edit Profile
                            </Button>}

                            <Button
                                disabled={!isValid}
                                type="submit"
                            >
                                Update Info
                            </Button>
                        </Flex>
                        
                    </Flex>

                </form>

            </Flex>

        </Flex>
    )
}