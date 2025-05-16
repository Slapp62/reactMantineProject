import { BackgroundImage, Center, Text, Box, Overlay, Button, Flex, Grid, Title } from '@mantine/core';
import { CardModal } from './Cards/CardModal';
import { Search } from './Navbar/Search';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import heroImage from '/office-hero.jpg'

export function Hero() {
    const isMobile = useMediaQuery('(max-width: 700px)');

    const user = useSelector((state: RootState) => state.userSlice.user);
    const isBusiness = user?.isBusiness;
    const isAdmin = user?.isAdmin;

    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    
    return (
    <Box mb={20}>
      <BackgroundImage
        src={heroImage}
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
                <Flex w='100%' gap={10} align='center' style={{flexDirection: isMobile ? 'column' : 'row'}}>
                  <Text fz={20} c='white'>Search for a listing:</Text>
                  <Flex flex={1}><Search/></Flex>
                </Flex>
                
                
                {isBusiness || isAdmin && 
                  <Button onClick={openModal}variant='filled' color='blue' size='lg' fz={25}>     
                  Create a listing
                  </Button>}
            </Flex>
          </Center>
        </Grid.Col>
        
      </Grid>
      

      </BackgroundImage>
      <CardModal opened={modalOpened} onClose={closeModal} />
    </Box>
  );
}
