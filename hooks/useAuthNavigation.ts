import { setAuthToken } from "@/lib/http";
import { getToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useAuthNavigation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = await getToken();
        if (!mounted) return;

        if (token) {
          // set token for future requests
          setAuthToken(token);
          // navigate to home inside the (tabs) group
          router.replace("/(tabs)/home");
        } else {
          // navigate to login
          router.replace("/auth/login");
        }
      } catch (err) {
        // on error, go to login
        router.replace("/auth/login");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  return { loading };
};
