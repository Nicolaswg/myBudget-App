// local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const setData = (data) => {
  return localStorage.setItem("userName", JSON.stringify(data.userName));
};

// generate random color
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// wait for 1 second
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2500));

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudget = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    amount: +amount,
    createdAt: Date.now(),
    budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};
