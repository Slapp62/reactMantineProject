//import { TUsers } from "@/Types";
import { Box, Button, Checkbox, Fieldset, Flex, Group, NumberInput, PasswordInput, TextInput } from "@mantine/core";

export function RegisterForm()  {
    return (
        <form style={{maxWidth: '60%', margin: 'auto'}}>
        <h1>Registration Form</h1>
        <Flex direction='column'>
            <Flex direction='row'>
                <Flex mx='auto' direction='column' w='50%' justify='space-between'>
                    <Fieldset legend="Full Name">
                        <TextInput label="First"/>
                        <TextInput label="Middle"/>
                        <TextInput label="Last"/>
                    </Fieldset>

                    <Fieldset legend="Credentials">
                        <TextInput label="Email"/>
                        <PasswordInput label="Password"/>
                    </Fieldset>

                    <Checkbox label='Do you have a business?'/>
                </Flex>

                <Flex direction='column' w='50%' justify='space-between'>
                    <Fieldset legend="Address">
                        <TextInput label="State"/>
                        <TextInput label="Country"/>
                        <TextInput label="City"/>
                        <TextInput label="Street"/>
                        <NumberInput label="Number"/>
                        <NumberInput label="Zipcode"/>
                    </Fieldset>

                    <Fieldset legend="Contact">
                        <NumberInput label="Phone"/>
                    </Fieldset>

                </Flex>
            </Flex>
            <Group w='50%' mx='auto'>
                <Button mx='auto' mt={20} w={200}>Clear Form</Button>
                <Button mx='auto' mt={20} w={200}>Submit</Button>
            </Group>
            
            </Flex>
        </form> 
    
    )
    
}