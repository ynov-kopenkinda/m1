import { useEffect } from "react";
import { io } from "socket.io-client";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";

const wsServerUrl = new URL(env.REACT_APP_BACKEND_URL).origin.replace(
  "http",
  "ws"
);

const ioClient = io(wsServerUrl, { transports: ["websocket"] });

export function useSocketClient() {
  const { token } = useAuth();

  useEffect(() => {
    ioClient.on("connect", () => {
      ioClient.emit("authenticate", { token });
    });
    return () => {
      ioClient.off("connect");
    };
  }, [token]);

  return ioClient;
}
