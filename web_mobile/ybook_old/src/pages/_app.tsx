import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import DefaultLayout from "../layout/DefaultLayout";
import AuthProvider from "../context/AuthContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);
