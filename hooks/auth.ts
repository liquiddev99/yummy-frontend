import Cookies from "js-cookie";

export function useAuth() {
  const token = Cookies.get("auth");

  return Boolean(token);
}
