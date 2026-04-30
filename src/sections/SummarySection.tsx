import { useState } from "react";

import useData from "../store";
import Button from "../ui/button";
import { formatAmount } from "../utils/formatters";
import { splitEqualy, splitFewerTransactions } from "../utils/splitter";

export default function SummarySection() {
  const [mode, setMode] = useState<"equal" | "quick">("equal");

  const { people, expenses } = useData((state) => state);

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const perPersonAmount = totalAmount / people.length;

  const peopleWhoPaid = expenses.reduce(
    (t, v) => {
      const person = people.find((p) => p.id === v.paidBy);
      if (!person) return t;
      const i = t.findIndex((p) => p.personId === person.id);
      if (i !== -1) {
        t[i].amount += v.amount;
      } else {
        t.push({
          personId: person.id,
          amount: v.amount,
        });
      }

      return t;
    },
    [] as { personId: string; amount: number }[],
  );

  const transactions =
    mode === "quick"
      ? splitFewerTransactions(people, peopleWhoPaid, perPersonAmount)
      : splitEqualy(people, peopleWhoPaid);

  const modeText = {
    equal: {
      title: "Equal Mode",
      description:
        "Each person pays their part. Calculates the total amount paid by each person and divides it equally among all.",
    },
    quick: {
      title: "Quick Mode",
      description:
        "Calculates the fewest transactions possible. Some people might pay more to one person, instead of paying two smaller amounts to two different people.",
    },
  };
  const getPersonName = (id: string) => {
    const person = people.find((p) => p.id === id);
    return person ? person.name : "Unknown";
  };

  return (
    <div>
      <h2 className="text-lg">Total: {formatAmount(totalAmount)}</h2>
      <h2 className="mb-2 italic">
        Per Person: {formatAmount(perPersonAmount)}
      </h2>

      <p>People who paid: </p>
      <ul className="list-disc list-inside">
        {peopleWhoPaid.map((row) => (
          <li key={`people-who-paid-${row.personId}`}>
            {getPersonName(row.personId)}: {formatAmount(row.amount)} - each{" "}
            {formatAmount(row.amount / people.length)}
          </li>
        ))}
      </ul>
      <hr className="my-3" />

      <div className="flex flex-1 gap-2">
        <Button
          label="Equal mode"
          className={`flex-1 ${mode === "equal" ? "bg-primary" : ""}`}
          onClick={() => setMode("equal")}
        />
        <Button
          label="Quick mode"
          className={`flex-1 ${mode === "quick" ? "bg-primary" : ""}`}
          onClick={() => setMode("quick")}
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-md">{modeText[mode].title}</h3>
        <p>{modeText[mode].description}</p>
        <h3 className="mt-3 font-bold text-lg">Transactions</h3>
        <ul className="list-decimal list-inside">
          {transactions.map((t, i) => (
            <li
              key={`transaction-${i}`}
              className={
                transactions[i - 1]?.personSender !== t.personSender
                  ? "mt-2"
                  : ""
              }
            >
              <b>{getPersonName(t.personSender)}</b> needs to send{" "}
              <b>{formatAmount(t.amount)}</b> to{" "}
              <b>{getPersonName(t.personReceiver)}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
