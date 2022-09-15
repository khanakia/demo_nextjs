import { useEffect, useState } from 'react';
import { isLoggedIn } from 'src/features/auth/utils/client'
const useLoggedIn = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(isLoggedIn())
  }, []);

  return hasMounted;
};

export default useLoggedIn