import '@mantine/core/styles.css';
import './App.css'; 
import { MantineProvider } from '@mantine/core';
import { Router } from './routing/Router';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router/>
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
