  import {
    Box,
    Image,
    Text,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './navigation.module.css';
  import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Logo } from '../logo';
 
  
  export function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  
    return (
      <Box pos="sticky" top={0} bg='white' style={{zIndex: 100}} opacity={0.9}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%" >
            <Logo/>
            
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Home
              </a>
              <a href="#" className={classes.link} >
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>

              <Group>
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
              </Group>
            </Group>
            
            

            <ColorSchemeToggle/>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            <Divider my="sm" />
  
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
  
            <Divider my="sm" />
  
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }