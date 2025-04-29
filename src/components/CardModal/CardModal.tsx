
import { Button, Flex, Modal, NumberInput, Paper, TextInput,  } from '@mantine/core';

export function CardModal({ opened, onClose }: { opened: boolean, onClose: () => void }) {
    
  return (
    <>
        <Modal   opened={opened} onClose={onClose} title='Create A Card'>
            <Paper>
                <form>
                    <Flex direction='column' gap={5} py={10}>
                        <TextInput label='Title'/>
                        <TextInput label='Subtitle'/>
                        <TextInput label='Description'/>
                        <NumberInput label='Phone' hideControls/>
                        <TextInput label='Email'/>
                    </Flex>
                    
                    <Flex justify='center' mt={20}>
                        <Button type='submit' size='lg'>Create</Button>  
                    </Flex>
                </form>
            </Paper>
        </Modal>
    </>
  );
}