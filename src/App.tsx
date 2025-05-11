import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import './App.css'; // or './styles/global.css'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAuthInit } from './hooks/UseAuthInit';


export default function App() {
  

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <InnerApp/>
      </Provider>
    </MantineProvider>
  );
}

function InnerApp() {
  useAuthInit();
  return <Router />
}