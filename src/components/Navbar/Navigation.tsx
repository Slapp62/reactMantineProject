import {
  Box, Burger, Button, Divider, Drawer, Flex, Text, Group, ScrollArea,
  useMantineColorScheme,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../ComponentStyles/Navigation.module.css';
import { LightDarkToggle } from '../LightDarkToggle'
import { Logo } from '../Logo';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AvatarIcon } from './Avatar';
  
  export function Navbar() {
    const user = useSelector((state: RootState) => state.userSlice.user);
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn)
    const isBusinessUser = user?.isBusiness;
    const dispatch = useDispatch<AppDispatch>();

    const jumpTo = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
  
    const logoutHandler = () => {
      jumpTo('/');
      dispatch(clearUser());
      toast.success('Logged out succesfully!', {position: 'bottom-right'});
    }

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
      <Box pos="sticky" className={clsx(classes.navbarTop, {[classes.navbarScrolled]: scrolled} )}>
        <header className={clsx(colorScheme === 'light' ? classes.navbarLight : classes.navbarDark, classes.header)}>
          <Flex justify="space-between" h='100%' >
            <Logo/>

            <Group visibleFrom="sm">
              <Link  to="/" className={classes.link}>
                <Text fw={700}>Home</Text>
              </Link>

              <Link to="/about" className={classes.link} >
                <Text fw={700}>About</Text>
              </Link>

              {loggedIn &&  <Link to="/favorites" className={classes.link} >
                <Text fw={700}>Favorites</Text>
              </Link>}

              {loggedIn && isBusinessUser && <Link to="/my-listings" className={classes.link} >
                <Text fw={700}>My Listings</Text>
              </Link>}
              
              {user?.isAdmin && <Link to='/admin' className={classes.link}>
                <Text fw={700}>Admin Controls</Text>
              </Link>}

              
            </Group>

            <Group>
              <Group visibleFrom="xs">
                {!loggedIn && <Link to='/login'><Button variant="outline">Login</Button></Link>}
                {!loggedIn && <Link to='/register'><Button>Register</Button></Link>}

                {loggedIn && <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
              </Group>

              <Group >
                {loggedIn && <Link to={`/edit-profile/${user?._id}`}><AvatarIcon/></Link>}
                <LightDarkToggle />
                <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
              </Group>
              
            </Group>
            
          </Flex>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="60%"
          padding="md"
          title="Business Cards"
          hiddenFrom="md"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-sm" >
            <Divider/>
              <Link to="/" className={classes.link} onClick={closeDrawer}>
                <Text fw={700}>Home</Text>
              </Link>

              <Link to="/about" className={classes.link} onClick={closeDrawer}>
                <Text fw={700}>About</Text>
              </Link>

              {loggedIn &&  <Link to="/favorites" className={classes.link} onClick={closeDrawer}>
                <Text fw={700}>Favorites</Text>
              </Link>}

              {user?.isBusiness && <Link to="/my-listings" className={classes.link} onClick={closeDrawer} >
                <Text fw={700}>My Listings</Text>
              </Link>}
              
              {user?.isAdmin && <Link to='/admin' className={classes.link} onClick={closeDrawer}>
                <Text fw={700}>Admin Controls</Text>
              </Link>}
  
            <Divider my="sm" />

            {loggedIn && <Center my="md">
              {loggedIn && <Link to={`/edit-profile/${user?._id}`}><AvatarIcon/></Link>}
            </Center>}

            <Flex justify="space-evenly" ta="center" p="sm" gap={5} direction="column">
              {!loggedIn && 
                <Link  to='/login' onClick={closeDrawer}>
                  <Button w="95%" variant="outline">Login</Button>
                </Link>}

              {!loggedIn && 
                <Link to='/register' onClick={closeDrawer}>
                  <Button w="95%">Register</Button>
                </Link>}

              {loggedIn && 
                <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
            </Flex>
          </ScrollArea>
        </Drawer>
      </Box>
    
    );
  }