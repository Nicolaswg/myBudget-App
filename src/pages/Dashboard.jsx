// rrd imports
import { useLoaderData } from "react-router-dom";

// librarys
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";

// helper functions
import { fetchData, setData } from "../helpers";

// loader
export function dashBoardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

// action
export async function dashBoardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    setData("userName", formData);
    return toast.success(`Welcome ${formData.userName}!`);
  } catch (error) {
    throw new Error("There was a a problem creating your account.");
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return <div>{userName ? <p>{userName}</p> : <Intro />}</div>;
};

export default Dashboard;
