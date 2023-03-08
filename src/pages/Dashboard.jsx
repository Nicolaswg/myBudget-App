// rrd imports
import { useLoaderData } from "react-router-dom";

// librarys
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

// helper functions
import {
  createBudget,
  createExpense,
  fetchData,
  setData,
  waait,
} from "../helpers";
import AddExpenseForm from "../components/AddExpenseForm";

// loader
export function dashBoardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

// action
export async function dashBoardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      setData(values);
      return toast.success(`Welcome ${values.userName}!`);
    } catch (error) {
      throw new Error("There was a a problem creating your account.");
    }
  }

  if (_action === "newBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a a problem creating your budget.");
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

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secre to financial freedom</p>
                <p>Create a budget to get started.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
