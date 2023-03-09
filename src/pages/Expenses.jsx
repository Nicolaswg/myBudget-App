//rrd imports
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

// helpers  imports
import { deleteItem, fetchData } from "../helpers";

// library imports
import { toast } from "react-toastify";

//loaders
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (error) {
      throw new Error("There was a a problem deleting your expense.");
    }
  }
}

const Expenses = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses yet.</p>
      )}
    </div>
  );
};

export default Expenses;
