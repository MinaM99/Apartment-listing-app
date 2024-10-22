// pages/_app.tsx
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar /> {/* Shared Navbar across all pages */}
      <div style={{ padding: '60px' }}> {/* Add padding here */}
        <Component {...pageProps} /> {/* Render the current page */}
      </div>
    </>
  );
};

export default MyApp;
