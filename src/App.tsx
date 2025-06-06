import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Router } from './Routing/Router';
import { theme } from './theme';
import './App.css'; // or './styles/global.css'
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { useAuthInit } from './hooks/UseAuthInit';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <InnerApp/>
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}

function InnerApp() {
  useAuthInit();
  return <Router/>
}