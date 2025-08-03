import '@mantine/core/styles.css';
import './App.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { AppRouter } from './routing/AppRouter';
import { persistor, store } from './store/store';
import { theme } from './theme';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <AppRouter />
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </MantineProvider>
    </ErrorBoundary>
  );
}
