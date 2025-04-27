  import {
    Box, Burger, Button, Divider, Drawer, Flex, Group, ScrollArea,
    useMantineColorScheme,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './navigation.module.css';
  import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle'
  import { Logo } from '../Logo/logo';
  import clsx from 'clsx';
  import { LoginModal } from '../LoginModal/Modal';
  import { Link } from 'react-router-dom';
import AuthContextCore from '@/AuthContext';
import { useContext } from 'react';
 
  
  export function Navbar() {
    const {user} = useContext(AuthContextCore)  
    
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();

    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  
    return (
      <Box pos="sticky" top={0} style={{zIndex: 100}} opacity={0.9} className={clsx(colorScheme === 'light' ? classes.navbarLight : classes.navbarDark)}>
        <header className={classes.header}>
          <Flex justify="space-between" h="100%" >
            
            <Group h="100%" gap={10} visibleFrom="sm">
              <Logo/>
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/about" className={classes.link} >
                About
              </Link>
              {user && <Link to="/" className={classes.link} >
                Favorites
              </Link>}
              {user && <Link to="/" className={classes.link} >
                My Cards
              </Link>}
              {user && <Link to='/admin' className={classes.link}>
                Admin
              </Link>}
            </Group>

            <Group>
              {!user && <Button variant="default" onClick={openModal}>Login</Button>}
              {user && <Button variant="outline" onClick={openModal}>Logout</Button>}
              {!user && <Link to='/register'><Button>Register</Button></Link>}
            
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
  
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              About
            </a>
            <a href="#" className={classes.link}>
              Admin
            </a>
  
            <Divider my="sm" />
  
            <Group justify="center" grow pb="sm" px="lg">
            <Button variant="default" onClick={() => {closeDrawer(); openModal();}}
              >Login</Button>
              
              <Button>Register</Button>
            </Group>
          </ScrollArea>
        </Drawer>
        <LoginModal opened={modalOpened} onClose={closeModal} />
      </Box>
    
    );
  }