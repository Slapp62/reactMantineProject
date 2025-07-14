import {Title, Paper, Group, Flex, Stack, Button} from '@mantine/core';
import { Link } from 'react-router-dom';

export const ChooseAccountType = () => {
    return (
        <Flex align='center' justify='center' h='90vh'>
            <Group>
                <Paper withBorder py={20} px={30}>
                    <Stack>
                        <Title order={2}>Are you a job seeker?</Title>
                        <Button component={Link} to='./jobseeker'>Sign Up</Button>
                    </Stack>
                </Paper>

                <Paper withBorder py={20} px={30}>
                    <Stack>
                        <Title order={2}>Are you a business?</Title>
                       <Button component={Link} to='./business'>Sign Up</Button>
                    </Stack>
                </Paper>
            </Group>
        </Flex>  
    );
};