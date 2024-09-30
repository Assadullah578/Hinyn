// utils/withAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if userId is stored in localStorage
      const userId = localStorage.getItem('hinyn-cjwt');

      // If no userId, redirect to login page
      if (!userId) {
        router.push('/');
      }
    }, [router]);

    // If userId exists, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
