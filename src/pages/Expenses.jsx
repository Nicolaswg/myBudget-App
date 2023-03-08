//rrd imports
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

// helpers  imports
import { fetchData } from "../helpers";

//loaders
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
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
