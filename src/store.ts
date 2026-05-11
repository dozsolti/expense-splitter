import { create } from "zustand";

import {
  expenseToString,
  nameToPersonId,
  personToString,
  stringToExpense,
} from "./utils/formatters";
import { getQueryParams, setQueryParams } from "./utils/query";

import type { Person, Expense, DataState } from "./types";

const isProd = window.location.href.includes("github");

function getStoreDefaultData() {
  const searchParams = getQueryParams();

  let people: Person[] = isProd
    ? []
    : [
        "Alice",
        "Bob",
        "Charlie",
        "David",
        "Eve",
        "Frank",
        "Grace",
        "Heidi",
        "Ivan",
        "Judy",
        "Karl",
      ].map(nameToPersonId);

  if (searchParams["people"]) {
    people = searchParams["people"].split("-").map(nameToPersonId);
  }

  let expenses: Expense[] = isProd
    ? []
    : [
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

  if (searchParams["expenses"]) {
    expenses = searchParams["expenses"].split(";").map(stringToExpense);
  }

  return { people, expenses };
}

const useData = create<DataState>(getStoreDefaultData);

useData.subscribe((state) => {
  const peopleStr = state.people.map(personToString).join("-");
  const expensesStr = state.expenses.map(expenseToString).join(";");

  setQueryParams({
    people: peopleStr,
    expenses: expensesStr,
  });
});

export const resetStore = () => {
  useData.setState({
    people: [],
    expenses: [],
  });
};
export const addPerson = (name: string) => {
  name = name
    .replace(/\s+-/g, " ")
    .replace(/-\s+/g, " ")
    .replace(/-/g, " ")
    .trim();

  useData.setState((state) => ({
    people: [...state.people, nameToPersonId(name)],
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
};

export const deleteExpense = (id: string) => {
  useData.setState((state) => ({
    expenses: state.expenses.filter((expense) => expense.id !== id),
  }));
};

export default useData;
