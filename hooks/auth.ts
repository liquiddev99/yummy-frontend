import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const flag = Cookies.get("isAuth");

  useEffect(() => {
    setIsAuth(Boolean(flag));
    setVerifying(false);
  }, [flag]);

  return { isAuth, verifying };
}
