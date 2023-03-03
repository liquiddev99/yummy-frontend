import axios from "axios";
import useSWR from "swr";

async function getProfile(url: string) {
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
}

export function useProfie() {
  return useSWR("http://localhost:8080/users/profile", getProfile);
}
