export interface Person {
  id: string;
  name: string;
}
export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
}
export interface DataState {
  people: Person[];
  expenses: Expense[];
}
