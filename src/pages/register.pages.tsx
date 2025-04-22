
import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Button, Checkbox, Fieldset, Flex, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import { useForm } from "react-hook-form";


export function RegisterForm()  {
    const { reset, register, formState: {errors, isValid} } = useForm<TUsers>({
        mode: 'onChange',
        resolver: joiResolver(registrationSchema)
    });

    return (
        <Flex maw='60%' mx='auto' direction='column'>
            <Box ta='center'><h1>Registration Form</h1></Box>

            <form >
                <Flex direction='row'>
                    <Flex mx='auto' direction='column' w='50%' justify='space-between'>
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

                        <Checkbox label='Do you have a business?'/>
                    </Flex>

                    <Flex direction='column' w='50%' justify='space-between'>
                        <Fieldset legend="Address">
                            <TextInput 
                                label="state"
                                {...register('address.state')}
                                error={errors.email?.message}
                                />
                            <TextInput 
                                label="Country"
                                {...register('address.country')}
                                error={errors.email?.message}
                                />
                            <TextInput 
                                label="City"
                                {...register('address.city')}
                                error={errors.email?.message}
                                />
                            <TextInput 
                                label="Street"
                                {...register('address.street')}
                                error={errors.email?.message}
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

                        <Fieldset legend="Contact">
                            <TextInput  
                                rightSection={<IconPhone/>} 
                                label="Phone"
                                {...register('phone')}
                                error={errors.email?.message}
                                />
                        </Fieldset>

                    </Flex>
                </Flex>

                <Group w='50%' mx='auto'>
                    <Button mx='auto' mt={20} w={200} onClick={() => reset()}>Clear Form</Button>
                    <Button mx='auto' mt={20} w={200} disabled={!isValid}>Submit</Button>
                </Group>
            </form> 
     </Flex>
    )
    
}