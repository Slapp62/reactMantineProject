  import {
    Box, Burger, Button, Divider, Drawer, Flex, Text, Group, ScrollArea,
    useMantineColorScheme,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './navigation.module.css';
  import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle'
  import { Logo } from '../Logo/logo';
  import clsx from 'clsx';
  import { LoginModal } from '../LoginModal/LoginModal';
  import { Link } from 'react-router-dom';
  import { Search } from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { toast } from 'react-toastify';
 
  
  export function Navbar() {
    const user = useSelector((state: RootState) => state.user.user);
    const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const dispatch = useDispatch<AppDispatch>();

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();

    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  
    const logoutHandler = () => {
      dispatch(clearUser());
      toast.success('Logged out succesfully!', {position: 'bottom-right'});
    }

    return (
      <Box pos="sticky" top={0} style={{zIndex: 100}} opacity={0.9} className={clsx(colorScheme === 'light' ? classes.navbarLight : classes.navbarDark)}>
        <header className={classes.header}>
          <Flex justify="space-between" h='100%' >
            <Logo/>

            <Group visibleFrom="sm">
              <Link  to="/" className={classes.link}>
                <Text fw={700}>Home</Text>
              </Link>

              <Link to="/about" className={classes.link} >
                <Text fw={700}>About</Text>
              </Link>

              {loggedIn &&  <Link to="/" className={classes.link} >
                <Text fw={700}>Favorites</Text>
              </Link>}

              {loggedIn &&  <Link to="/" className={classes.link} >
                <Text fw={700}>My Cards</Text>
              </Link>}
              
              {user?.isAdmin && <Link to='/admin' className={classes.link}>
                <Text fw={700}>Admin Controls</Text>
              </Link>}

              <Search/>
            </Group>

            <Group>
              {!loggedIn && <Button variant="outline" onClick={openModal}>Login</Button>}
              {!loggedIn && <Link to='/register'><Button>Register</Button></Link>}

              {loggedIn && <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
              <LightDarkToggle />
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
            </Group>
            
          </Flex>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="50%"
          padding="md"
          title="Business Cards"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-sm">
            <Divider />
  
              <Link  to="/" className={classes.link}>
                <Text fw={700}>Home</Text>
              </Link>

              <Link to="/about" className={classes.link} >
                <Text fw={700}>About</Text>
              </Link>

              {loggedIn &&  <Link to="/" className={classes.link} >
                <Text fw={700}>Favorites</Text>
              </Link>}

              {loggedIn &&  <Link to="/" className={classes.link} >
                <Text fw={700}>My Cards</Text>
              </Link>}
              
              {user?.isAdmin && <Link to='/admin' className={classes.link}>
                <Text fw={700}>Admin Controls</Text>
              </Link>}
  
            <Divider my="sm" />
  
            <Group justify="center" grow pb="sm" px="lg">
              {!loggedIn && <Button variant="outline" onClick={() => {closeDrawer(); openModal();}}>Login</Button>}
              {!loggedIn && <Link to='/register'><Button>Register</Button></Link>}

              {loggedIn && <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
            </Group>
          </ScrollArea>
        </Drawer>
        <LoginModal opened={modalOpened} onClose={closeModal} />
      </Box>
    
    );
  }