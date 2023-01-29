import { type NextPage } from "next";
import ProtectedLayout from "../components/layout/ProtectedLayout";

const Home: NextPage = () => {
  return <ProtectedLayout>Hi</ProtectedLayout>;
};

export default Home;
