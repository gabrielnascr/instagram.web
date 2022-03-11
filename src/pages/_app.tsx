/* eslint-disable react/jsx-props-no-spreading */
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
