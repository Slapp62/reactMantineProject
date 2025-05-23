import { BackgroundImage, Center, Text, Box, Overlay, Button, Flex, Grid, Title } from '@mantine/core';
import { Search } from './Navbar/Search';
import { useMediaQuery } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import heroImage from '/office-hero.jpg'
import { useNavigate } from 'react-router-dom';

export function Hero() {
    const jumpTo = useNavigate();
    const isMobile = useMediaQuery('(max-width: 700px)');

    const user = useSelector((state: RootState) => state.userSlice.user);
    const isBusiness = user?.isBusiness;
    
    return (
    <Box mb={20} >
      <BackgroundImage
        src={heroImage}
        mih={500}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      
        <Center pos='relative'  style={{borderRadius: "20px", width: isMobile ? '90%' : '40%'}} >
          <Overlay pos='absolute'  color="#000" backgroundOpacity={0.80} blur={2} zIndex={1} radius="lg"/>
          <Flex
            direction='column'
            gap={20}
            p={30}
            style={{zIndex: 2}}
            w='100%'
            
            >
            
              {!user && <Title ta='center' c='white'>Find your next career!</Title>}

              {user && <Text ta='center' c='blue'fw='bold' fz={30}>Welcome Back, {user.name.first}</Text>}

              <Flex w='100%' gap={10} align='center' style={{flexDirection: isMobile ? 'column' : 'row'}}>
                <Text fz={20} c='white'>Search for a listing:</Text>
                <Flex flex={1}><Search/></Flex>
              </Flex>
              
              {isBusiness && 
                <Button onClick={() => jumpTo('create-card')} variant='filled' color='blue' size='lg' fz={25}>     
                Create a listing
                </Button>}
          </Flex>
        </Center>

      </BackgroundImage>
    </Box>
  );
}
