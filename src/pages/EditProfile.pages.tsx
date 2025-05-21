import { RootState } from "@/store/store";
import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { Button, Fieldset, Flex, Image, PasswordInput, TextInput, Title } from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";

export function EditProfile() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const user = useSelector((state:RootState) => state.userSlice.user);
    const [isDisabled, setDisabled] = useState(true);
    const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

    if (!user) {return <h1>Loading...</h1>};

    const cleanedUserData = (user: TUsers) => ({
        name: {
            first: user.name.first,
            middle: user.name?.middle || '',
            last: user.name.last,
        },
        phone: user.phone,
        email: user.email,
        image: {
            url: user.image?.url || '',
            alt: user.image?.alt || '',
        },
        address: {
            state: user.address?.state || '',
            country: user.address?.country,
            city: user.address?.city,
            street: user.address?.street,
            // @ts-ignore-next-line
            houseNumber: String(user.address?.houseNumber),
            // @ts-ignore-next-line
            zip: String(user.address?.zip),
        }
    })

    const {register, handleSubmit, reset, formState: {errors, isValid, isDirty}, } = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(registrationSchema),
        defaultValues: cleanedUserData(user),
    });

    useEffect(() => {
        if (user) {
            const defaultUserValues = cleanedUserData(user);
            reset(defaultUserValues);
        };
    }, [reset, user])
    
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
        <Flex mt={20} direction='column' align='center' gap={20} >

            <Title>Edit Profile</Title>

            <Flex justify='center' direction="column" style={{width: isMobile ? '90%' : '50%'}}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Flex gap={10} direction='column' m='auto'>

                        <Fieldset legend='Name'>
                            <TextInput
                                label='First'
                                disabled={isDisabled}
                                required
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
                                required
                                {...register('name.last')}  
                                error={errors.name?.last?.message}
                            /> 
                        </Fieldset>

                        <Fieldset legend='Address'>
                            <TextInput
                                label='Country'
                                disabled={isDisabled}
                                {...register('address.country')}
                                required
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
                                required
                                error={errors.address?.city?.message}
                            />

                            <TextInput
                                label='Street'
                                disabled={isDisabled}
                                {...register('address.street')}
                                required
                                error={errors.address?.street?.message}
                            />

                            <TextInput
                                label='House Number'
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
                                {...register('email')}
                                required
                                error={errors.email?.message}
                            />

                            {/* <PasswordInput
                                label='Password'
                                disabled={isDisabled}
                                {...register('password')}
                                required
                                error={errors.password?.message}
                            /> */}
                        </Fieldset> 

                        <Fieldset legend="Other Details">
                            <TextInput
                                rightSection={<IconPhone/>} 
                                label='Phone'
                                disabled={isDisabled}
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
                        </Fieldset>

                        <Flex direction="column" gap={5} w="50%" mx="auto">
                            {!user?.isBusiness && <Button>Become a Business User</Button>}
                            
                            {isDisabled && 
                                <Button onClick={() => {
                                setDisabled(false);
                                scrollToTop();
                                }}
                                >
                                Edit Profile
                                </Button>}

                            <Button
                                disabled={!isValid || !isDirty}
                                type="submit"
                            >
                                Update Info
                            </Button>
                        </Flex>
                        
                    </Flex>
                   {JSON.stringify({ isValid, isDirty, errors}, null, 2)}      
                </form>

            </Flex>

        </Flex>
    )
}