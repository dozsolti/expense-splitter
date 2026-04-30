import { TrashIcon } from "lucide-react";
import { useState } from "react";

import useData, { addExpense, deleteExpense } from "../store";
import Button from "../ui/button";
import Input from "../ui/input";
import { formatAmount } from "../utils/formatters";

export default function ExpensesSection() {
  const { people, expenses } = useData((state) => state);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(people[0]?.id || "");

  const isValidateExpense = () => {
    return !(
      amount.trim() === "" ||
      isNaN(parseFloat(amount)) ||
      paidBy === "" ||
      description.trim() === ""
    );
  };

  const tryAddExpense = () => {
    if (!isValidateExpense()) return;
    addExpense(description, parseFloat(amount), paidBy);
    setDescription("");
    setAmount("");
    setPaidBy(people[0]?.id || "");
  };

  const getPersonName = (id: string) => {
    const person = people.find((p) => p.id === id);
    return person ? person.name : "Unknown";
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Input
          label="Description"
          placeholder="Gas, tickets, groceries, etc."
          className="flex-1"
          value={description}
          onChange={setDescription}
          onEnter={tryAddExpense}
        />
        <Input
          label="Amount"
          type="number"
          placeholder="$ 0.00"
          step={0.1}
          className="flex-1"
          value={amount}
          onChange={setAmount}
          onEnter={tryAddExpense}
        />
        <p className="font-bold text-card-foreground">Who paid?</p>
        <select
          className="bg-accent mb-4 p-2 border rounded-lg text-card-foreground"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <Button
          label="Add"
          variant="primary"
          onClick={tryAddExpense}
          disabled={!isValidateExpense()}
        />
      </div>
      <hr className="my-4" />

      <ul className="list-inside list-none">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center bg-black/10 shadow-lg mb-2 py-2 pr-2 pl-4 rounded-lg"
          >
            <div className="flex flex-col">
              <span className="font-medium text-lg">{expense.description}</span>
              <span className="font-medium text-card-foreground text-sm italic">
                {getPersonName(expense.paidBy)}
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col items-end">
                <span className="font-medium text-lg">
                  {formatAmount(expense.amount)}
                </span>
                <span className="font-medium text-xs italic">
                  {formatAmount(expense.amount / people.length)} each
                </span>
              </div>
              <Button
                label=""
                variant="outline"
                size="sm"
                before={<TrashIcon size={20} color="red" />}
                onClick={() => deleteExpense(expense.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold text-lg text-right">
        Total:{" "}
        {formatAmount(
          expenses.reduce((total, expense) => total + expense.amount, 0),
        )}
      </p>
      <p className="text-right">
        per:{" "}
        {formatAmount(
          expenses.reduce((total, expense) => total + expense.amount, 0) /
            people.length,
        )}
      </p>
    </>
  );
}
