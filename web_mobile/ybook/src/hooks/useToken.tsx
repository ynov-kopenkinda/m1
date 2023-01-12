import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function useToken() {
  const { token } = useAuth();
  const router = useRouter();
  if (token === undefined) {
    if ("window" in globalThis) {
      router.push("/login");
    }
    return "";
  }
  return token;
}
