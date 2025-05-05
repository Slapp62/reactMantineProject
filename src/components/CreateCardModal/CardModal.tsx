/* eslint-disable no-console */
import { TCards } from '@/Types';
import { cardSchema } from '@/validationRules/card.joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Fieldset, Flex, Modal, NumberInput, Paper, Textarea, TextInput,  } from '@mantine/core';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export function CardModal({ opened, onClose }: { opened: boolean, onClose: () => void }) {
    const { register, handleSubmit, formState: {errors, isValid} } = useForm<TCards>({
        mode: 'all',
        resolver: joiResolver(cardSchema)
    });

    const onSubmit = async (data:FieldValues) => {
        const token = sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;

        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', data)

            if (response.status === 201) {
                toast.success('Card Submitted!')
            }
        } catch (error:any) {
            console.error('Error processing form.', error, error.response.data, error.request, error.message);

            toast.error('Card creation failed!')
        }
    }

  return (
    <>
        <Modal   opened={opened} onClose={onClose} title='Create A Card'>
            <Paper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction='column' gap={10} py={10}>
                        <Fieldset legend='Job Info'>
                            <TextInput label='Title'/>
                            <TextInput label='Subtitle'/>
                            <Textarea label='Description'/>
                            <TextInput label='Phone' />
                            <TextInput label='Email'/>
                            <TextInput label='Website' />
                            <TextInput label='URL' />
                            <TextInput label='Alt Text' />
                        </Fieldset>
                        
                        <Fieldset legend='Address'>
                            <TextInput label='State' />
                            <TextInput label='Country' />
                            <TextInput label='City' />
                            <TextInput label='Street' />
                            <TextInput label='House Number' />
                            <TextInput label='Zipcode' />
                        </Fieldset>
                                                
                    </Flex>
                    
                    <Flex justify='center' mt={20}>
                        <Button type='submit' size='lg' disabled={!isValid}>Create</Button>  
                    </Flex>
                </form>
            </Paper>
        </Modal>
    </>
  );
}