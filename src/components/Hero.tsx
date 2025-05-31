import { BackgroundImage, Center, Text, Box, Overlay, Button, Flex, Title, Select, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import heroImage from '/office-hero.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { setSortOption } from '@/store/cardSlice';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { setSearchWord } from '@/store/searchSlice';

export function Hero() {
    const jumpTo = useNavigate();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userSlice.user);
    const isBusiness = user?.isBusiness;
    const isAdmin = user?.isAdmin;
    const sortOption = useSelector((state: RootState) => state.cardSlice.sortOption);

    return (
    <Box mb={20} >
      <BackgroundImage
        src={heroImage}
        aria-label='office background image'
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
            w="100%"
            >
              {/* Conditional Welcome Message */}
              {!user && <Title ta='center' c='white'>Find your next career!</Title>}
              {user && <Text ta='center' c='blue'fw='bold' fz={30}>Welcome Back, {user.name.first}</Text>}

              {/* Search & Sort */}
              <Flex gap={10} align='center' style={{flexDirection: isMobile ? 'column' : 'row'}}>

                {/* Search */}
                <TextInput
                  w='65%'
                  variant='default'
                  rightSection={<IconSearch/>}
                  placeholder="Search for a listing..."
                  
                  onChange={(e)=> {dispatch(setSearchWord(e.target.value))}}
                />

                {/* Sort */}
                <Select 
                  w='65%'
                  placeholder='Sort By'
                  rightSection={<IconFilter/>}
                  data={[
                    {value: "title-asc", label: "Title (A-Z)"},
                    {value: "title-desc", label: "Title (Z-A)"},
                    {value: "date-created-old", label: "Date Created (Oldest First)"},
                    {value: "date-created-new", label: "Date Created (Latest First)"}
                  ]}
                  value={sortOption}
                  onChange={(value) => {
                    dispatch(setSortOption(value || ''));
                  }}
                />
              </Flex>

            {/* Conditinally Register */}
            {!user &&  
              <Title order={2} ta='center' style={{color: "lightgreen"}}>
              <Link to="register" style={{textDecoration: "", color: "lightgreen"}}>Register</Link> now and start your journey
              </Title>}

            {/* Conditinally Create Listing */}
            {isBusiness || isAdmin && 
              <Button onClick={() => jumpTo('create-card')} variant='filled' color='blue' size='md' fz={25}>     
              Create A Listing
              </Button>}
          </Flex>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
