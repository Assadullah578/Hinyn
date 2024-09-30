import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position:'fixed',
          width:'100vw',
          height:'100vh',
          zIndex: 9998,
          backgroundColor:'#ddd',
          opacity: 0.6,
          pointerEvents: 'none !important',
        }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              pointerEvents: 'none !important',
              userSelect: 'none'
            }}
          >
            <Loader />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
