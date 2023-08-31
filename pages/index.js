// pages/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to the login page
  }, []);

}

export default HomePage;
