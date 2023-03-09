// rrd imports
import { Link, useFetcher } from "react-router-dom";

// Library imports
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getllMatchingItems,
} from "../helpers";

const ExpenseItem = ({ expense }) => {
  const { name, amount, createdAt } = expense;
  const budget = getllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  const fetcher = useFetcher();
  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
      <td>
        <Link
          to={`/budget/${budget.id}`}
          style={{
            "--accent": budget.color,
          }}
        >
          {budget.name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
