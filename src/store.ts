import { create } from "zustand";

interface DataState {
  people: { id: string; name: string }[];
  expenses: {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
  }[];
}

const testPeople = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Heidi" },
  { id: 9, name: "Ivan" },
  { id: 10, name: "Judy" },
  { id: 11, name: "Karl" },
];

const testExpenses = [
  {
    id: "test-expense-1",
    description: "Dinner",
    amount: 227.25,
    paidBy: "alice",
  },
  {
    id: "test-expense-2",
    description: "Lunch",
    amount: 115.35,
    paidBy: "bob",
  },
  {
    id: "test-expense-3",
    description: "Taxi",
    amount: 675.27,
    paidBy: "charlie",
  },
  {
    id: "test-expense-4",
    description: "Movie Tickets",
    amount: 100,
    paidBy: "david",
  },
];

const useData = create<DataState>(() => ({
  people:
    new URL(window.location.href).searchParams
      .get("people")
      ?.split("-")
      .map((name) => ({
        id: nameToId(name),
        name,
      })) ||
    (window.location.href.includes("github")
      ? []
      : testPeople.map((person) => ({ ...person, id: nameToId(person.name) }))),
  expenses:
    new URL(window.location.href).searchParams
      .get("expenses")
      ?.split(";")
      .map((expenseStr) => {
        const [description, amountStr, paidBy] = expenseStr.split(",");
        return {
          id: crypto.randomUUID(),
          description,
          amount: parseFloat(amountStr),
          paidBy,
        };
      }) || (window.location.href.includes("github") ? [] : testExpenses),
}));

useData.subscribe((state) => {
  const peopleStr = state.people.map((person) => person.name.trim()).join("-");
  const expensesStr = state.expenses
    .map((expense) =>
      [expense.description, expense.amount, expense.paidBy].join(","),
    )
    .join(";");

  const url = new URL(window.location.href);
  url.searchParams.set("people", peopleStr);
  url.searchParams.set("expenses", expensesStr);
  window.history.pushState(null, "", url.toString());
});

export const resetStore = () => {
  useData.setState({
    people: [],
    expenses: [],
  });
};
export const addPerson = (name: string) => {
  useData.setState((state) => ({
    people: [...state.people, { id: nameToId(name), name }],
  }));
};

export const deletePerson = (id: string) => {
  useData.setState((state) => ({
    people: state.people.filter((person) => person.id !== id),
    expenses: state.expenses.filter((expense) => expense.paidBy !== id),
  }));
};

export const addExpense = (
  description: string,
  amount: number,
  paidBy: string,
) => {
  useData.setState((state) => ({
    expenses: [
      ...state.expenses,
      { id: crypto.randomUUID(), description, amount, paidBy },
    ],
  }));

  console.log(useData.getState());
};

export const deleteExpense = (id: string) => {
  useData.setState((state) => ({
    expenses: state.expenses.filter((expense) => expense.id !== id),
  }));
};

export default useData;

function nameToId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
