// rrd imports

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  toast.success("You have been logged out");
  deleteItem({
    key: "userName",
  });
  return redirect("/");
}
