/* eslint-disable no-console */

import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Button, Checkbox, Fieldset, Flex, Group, PasswordInput, Switch, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";


export function RegisterForm()  {
    const isMobile = useMediaQuery('(max-width: 700px)');

    const { reset, register, handleSubmit, formState: {errors, isValid} } = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(registrationSchema)
    });

    const onSubmit = async (data:FieldValues) => {
        console.log(data);

        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        
        
        try {
            const response = await axios.post(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', 
                data)

            if (response.status === 201) {
                console.log(response);
                console.log('Registration successfull.');

                toast.success('Registered!')
            }
        } catch (error: any) {
            console.error('Error processing form.', error, error.response.data, error.request, error.message);

            toast.error('Registration Failed!')
        }
    }
        

    return (
        <Flex style={{width: isMobile ? '95%' : "70%"}} mx='auto' direction='column'>
            <Box ta='center'><h1>Registration Form</h1></Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex style={{flexDirection: isMobile ? 'column' : "row"}} gap={5}>
                    <Flex mx='auto' direction='column' style={{width: isMobile ? '95%' : "60%"}} justify='space-between' gap={5}>
                        <Fieldset legend="Full Name">
                            <TextInput 
                                label="First"
                                {...register('name.first')}
                                error= {errors.name?.first?.message}/>
                            <TextInput 
                                label="Middle"
                                {...register('name.middle')}
                                error={errors.name?.middle?.message}
                                />
                            <TextInput 
                                label="Last"
                                {...register('name.last')}
                                error={errors.name?.last?.message}
                                />
                        </Fieldset>

                        <Fieldset legend="Contact">
                            <TextInput  
                                rightSection={<IconPhone/>} 
                                label="Phone"
                                {...register('phone', {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^\d-]/g, '');
                                    },
                                })}
                                error={errors.phone?.message}
                                />
                        </Fieldset>
                        
                        <Fieldset legend="Credentials">
                            <TextInput 
                                label="Email"
                                {...register('email')}
                                error={errors.email?.message}
                                />
                            <PasswordInput 
                                label="Password"
                                {...register('password')}
                                error={errors.password?.message}
                                />
                        </Fieldset>

                        <Fieldset legend="Image">
                            <TextInput
                                label="URL"
                                {...register('image.url')}
                                error={errors.image?.url?.message}
                                />
                            <TextInput
                                label="Image Alt"
                                {...register('image.alt')}
                                error={errors.image?.alt?.message}
                                />
                        </Fieldset>
                    </Flex>

                    <Flex direction='column' style={{width: isMobile ? '95%' : "60%"}} mx="auto" justify='space-between'>
                        <Fieldset legend="Address">
                            <TextInput 
                                label="State"
                                {...register('address.state')}
                                error={errors.address?.state?.message}
                                />
                            <TextInput 
                                label="Country"
                                {...register('address.country')}
                                error={errors.address?.country?.message}
                                />
                            <TextInput 
                                label="City"
                                {...register('address.city')}
                                error={errors.address?.city?.message}
                                />
                            <TextInput 
                                label="Street"
                                {...register('address.street')}
                                error={errors.address?.street?.message}
                                />
                            
                            <TextInput
                                label="House Number"
                                {...register('address.houseNumber', {
                                    onChange: (e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                    },
                                })}
                                error={errors.address?.houseNumber?.message}
                            />

                            <TextInput
                                label="Zipcode"
                                {...register('address.zip', {
                                    onChange: (e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                    },
                                })}
                                error={errors.address?.zip?.message}
                            />
                        </Fieldset>

                        
                        <Checkbox mt={20} label='Are you an employer?' {...register('isBusiness')}/>
                    </Flex>
                </Flex>

                <Flex gap={10} align="center" w="95%" mx='auto' my={20} style={{flexDirection: isMobile ? 'row' : "column"}}>
                    <Button variant="outline" type='reset' w={200} onClick={() => reset()}>Reset Form</Button>
                    <Button type="submit" mx='auto' w={200} disabled={!isValid}>Submit</Button>
                </Flex>
            </form> 
     </Flex>
    )
    
}