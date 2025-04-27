import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import './App.css'; // or './styles/global.css'
import {AuthCoreProvider} from './AuthContext';


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthCoreProvider>
        <Router />
      </AuthCoreProvider>
    </MantineProvider>
  );
}
