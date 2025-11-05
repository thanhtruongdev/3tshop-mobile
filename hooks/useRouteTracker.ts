import { setCurrentRoute } from '@/lib/http';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';

/**
 * Hook để track current route và update vào http interceptor
 * Sử dụng trong root layout để track toàn bộ app
 */
export function useRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);
}
