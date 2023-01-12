import { type NextPage } from "next";
import useToken from "../hooks/useToken";

const Home: NextPage = () => {
  useToken();
  return <></>;
};

export default Home;
