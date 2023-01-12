import { type NextPage } from "next";
import useToken from "../hooks/useToken";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  useToken();
  const { data } = trpc.example.hello.useQuery();
  return <>{data?.greeting}</>;
};

export default Home;
