export type Transaction = {
  personReceiver: string;
  personSender: string;
  amount: number;
};
export function splitEqualy(
  people: { id: string }[],
  peopleWhoPaid: { personId: string; amount: number }[],
): Transaction[] {
  let transactions: Transaction[] = [];

  for (let i = 0; i < people.length; i++) {
    transactions = transactions.concat(
      peopleWhoPaid
        .filter((p) => p.personId !== people[i].id)
        .map((p) => {
          const personSender = people[i].id;
          const personReceiver = p.personId;
          const amount = p.amount / people.length;

          const anotherTransactionIndex = transactions.findIndex(
            (o) =>
              o.personReceiver == personSender &&
              o.personSender === personReceiver,
          );
          if (anotherTransactionIndex != -1) {
            const anotherTransaction = transactions[anotherTransactionIndex];
            if (amount === anotherTransaction.amount) return null;
            if (amount > anotherTransaction.amount) {
              const x = transactions[anotherTransactionIndex].amount;
              transactions[anotherTransactionIndex].amount = 0;
              return {
                personSender,
                personReceiver,
                amount: amount - x,
              };
            } else {
              const x = transactions[anotherTransactionIndex].amount;
              transactions[anotherTransactionIndex].amount = 0;
              return {
                personSender: personReceiver,
                personReceiver: personSender,
                amount: x - amount,
              };
            }
          }

          return {
            personSender,
            personReceiver,
            amount,
          };
        })
        .filter(
          (
            item,
          ): item is {
            personSender: string;
            personReceiver: string;
            amount: number;
          } => item !== null && item.amount > 0,
        ),
    );
  }
  transactions = transactions.filter((o) => o.amount > 0);
  transactions.sort((a, b) => {
    if (a.personSender === b.personSender) {
      return a.personReceiver.localeCompare(b.personReceiver);
    }
    return a.personSender.localeCompare(b.personSender);
  });

  return transactions;
}

export function splitFewerTransactions(
  people: { id: string }[],
  peopleWhoPaid: { personId: string; amount: number }[],
  each: number,
): Transaction[] {
  const transactions: Transaction[] = [];

  const uniquePeople = people.map((p) => {
    const paid = peopleWhoPaid.find((pp) => pp.personId === p.id)?.amount || 0;
    return {
      id: p.id,
      amount: paid,
    };
  });

  const peopleWhoOwns = uniquePeople

    .map((p) => ({ ...p, toPay: each - p.amount }))
    .filter((p) => p.toPay > 0);

  const peopleWhoNeeds = uniquePeople
    .map((p) => ({ ...p, toPay: each - p.amount }))
    .filter((p) => p.toPay < 0);

  for (let i = 0; i < peopleWhoNeeds.length; i++) {
    for (let j = 0; j < peopleWhoOwns.length; j++) {
      if (peopleWhoOwns[j].toPay === 0) continue;
      if (peopleWhoNeeds[i].toPay > 0) break;

      const amount = +Math.min(
        Math.abs(peopleWhoNeeds[i].toPay),
        peopleWhoOwns[j].toPay,
      ).toFixed(2);
      if (amount === 0) continue;

      transactions.push({
        personSender: peopleWhoOwns[j].id,
        personReceiver: peopleWhoNeeds[i].id,
        amount,
      });
      peopleWhoNeeds[i].toPay += amount;
      peopleWhoOwns[j].toPay -= amount;
    }
  }

  transactions.sort((a, b) => {
    if (a.personSender === b.personSender) {
      return a.personReceiver.localeCompare(b.personReceiver);
    }
    return a.personSender.localeCompare(b.personSender);
  });

  return transactions;
}
