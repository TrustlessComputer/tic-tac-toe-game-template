import React from 'react';
import routes from '@/routes/index';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/state';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider, { ThemedGlobalStyle } from '@/theme/theme';
import { Toaster } from 'react-hot-toast';
import './reset.scss';
import '@/styles/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);
const App: React.FC = (): React.ReactElement => {
  const element = useRoutes(routes);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <>{element}</>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                lineBreak: 'anywhere',
                maxWidth: 350,
              },
            }}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
