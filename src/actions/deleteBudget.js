// rrd imports
import { redirect } from "react-router-dom";

// helpers imports
import { deleteItem, getAllMatchingItems } from "../helpers";

// library imports
import { toast } from "react-toastify";

export const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully");
  } catch (error) {
    throw new Error("There was an error deleting your budget");
  }

  return redirect("/");
};
