import { useMutation } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";

export const useCreateUser = () => {
  const { token } = useAuth();
  const { mutateAsync } = useMutation((data) =>
    fetch(`${env.REACT_APP_BACKEND_URL}/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  );
  return mutateAsync;
};
