import { RootState } from '@/store/store';
import { BackgroundImage, Center, Text, Box, Overlay, Button, Flex } from '@mantine/core';
import { useSelector } from 'react-redux';
import { CardModal } from './CardModal/CardModal';
import { useDisclosure } from '@mantine/hooks';

export function Hero() {
    const user = useSelector((state: RootState) => state.user.user);
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    
    return (
    <Box mb={20}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        mih={500}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      
      <Center maw={600} pos='relative'  style={{borderRadius: "20px"}}>
          <Overlay pos='absolute'  color="#000" backgroundOpacity={0.80} blur={2} zIndex={1} radius="lg"/>
          <Box
            ta='center' 
            p={35}
            style={{zIndex: 2}}>
              {!user && <Text c='white' fw='bold' fz={30}>Find your next career!</Text>}

              <Flex align='center' direction='column' gap={10}>
                {user && <Text c='blue' fw='bold' fz={30}>Welcome back, {user.name.first}</Text>}
                {user && <Button onClick={openModal} variant='filled' color='blue' size='xl' fz={30}> Create a listing</Button>}
              </Flex>
              
          </Box>
      </Center>

      </BackgroundImage>
      <CardModal opened={modalOpened} onClose={closeModal} />
    </Box>
  );
}
