import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import './App.css'; // or './styles/global.css'


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications w={300} position='bottom-right' autoClose={4000}/>
      <Router />
    </MantineProvider>
  );
}
