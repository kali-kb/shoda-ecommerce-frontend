import { useState, useEffect } from 'react';

export default function useScreenWidth() {
  const [isMobile, setIsMobile] = useState(false);  // Initial state

  useEffect(() => {
    const handleResize = () => {
      const isMobileViewport = window.innerWidth <= 578; // Adjust breakpoint as needed
      setIsMobile(isMobileViewport);
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Check initial screen size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
