import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import './App.css'; // or './styles/global.css'
import { Provider } from 'react-redux';
import { store } from './store/store';


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MantineProvider>
  );
}
