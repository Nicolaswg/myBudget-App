//rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// componets imports
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers imports
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expense = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget)
    throw new Error("The budget you're trying to find does not exist.");
  return { budget, expense };
}

// actions

export async function budgetAction({ request }) {
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

  if (_action === "newExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a a problem creating your expense.");
    }
  }
}

const Bubgets = () => {
  const { budget, expense } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} Overview</span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expense && expense.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{`${budget.name} `}</span>
            Expenses
          </h2>
          <Table expenses={expense} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default Bubgets;
