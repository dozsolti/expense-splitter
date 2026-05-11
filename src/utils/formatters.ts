import type { Expense, Person } from "../types";

export function formatAmount(amount: number): string {
  return `${amount.toFixed(2)} Ron`;
}

export function nameToPersonId(name: string) {
  const id = name.toLowerCase().replace(/\s+/g, "-");
  return {
    id,
    name,
  };
}

export function personToString(person: Person): string {
  return person.name;
}

export function stringToExpense(expenseStr: string): Expense {
  const [description, amountStr, paidBy] = expenseStr.split(",");
  return {
    id: crypto.randomUUID(),
    description,
    amount: parseFloat(amountStr),
    paidBy,
  };
}

export function expenseToString(expense: Expense): string {
  return [expense.description, expense.amount, expense.paidBy].join(",");
}
