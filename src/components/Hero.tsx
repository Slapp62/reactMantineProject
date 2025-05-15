import { BackgroundImage, Center, Text, Box, Overlay, Button, Flex, Grid, Title } from '@mantine/core';
import { CardModal } from './Cards/CardModal';
import { Search } from './Navbar/Search';
import { useDisclosure } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';


export function Hero() {

    const user = useSelector((state: RootState) => state.userSlice.user);
  
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    
    return (
    <Box mb={20}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        mih={500}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      
      <Grid>
        <Grid.Col span={{base: 8, xs: 12}} m='auto'>
          <Center pos='relative'  style={{borderRadius: "20px"}}>
            <Overlay pos='absolute'  color="#000" backgroundOpacity={0.80} blur={2} zIndex={1} radius="lg"/>
            <Flex
              direction='column'
              gap={20}
              p={35}
              style={{zIndex: 2}}
              w={500}
              >
              
                {!user && <Title ta='center' c='white'>Find your next career!</Title>}

                {user && <Text ta='center' c='blue'fw='bold' fz={30}>Welcome Back, {user.name.first}</Text>}
                <Flex w='100%' gap={10} align='center'>
                  <Text fz={20} c='white'>Search for a listing:</Text>
                  <Center flex={1}><Search/></Center>
                </Flex>
                
                
                {user && <Button onClick={openModal}variant='filled' color='blue' size='lg' fz={25}>     
                  Create a listing</Button>}
            </Flex>
          </Center>
        </Grid.Col>
        
      </Grid>
      

      </BackgroundImage>
      <CardModal opened={modalOpened} onClose={closeModal} />
    </Box>
  );
}
