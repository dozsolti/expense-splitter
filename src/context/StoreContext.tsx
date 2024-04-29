import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import type { People } from '../types';

interface ContextProps {
  people: People[],
  setPeople: Dispatch<SetStateAction<People[]>>
}
const StoreContext = createContext<ContextProps>({
  people: [],
  setPeople: ()=> {}
})

export function StoreProvider({ children }: {children: ReactElement}) {
  const [people, setPeople] = useState<People[]>([])

  return (
    <StoreContext.Provider value={{ people, setPeople }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const { people, setPeople } = useContext(StoreContext)

  const total = +(people.reduce((t, v) => +t + +v.amount, 0)).toFixed(2)
  const each = +(total / (people.length || 1)).toFixed(2)

  const addPeople = () => {
    if (!setPeople) return;

    setPeople((p: People[]) => ([...p, { id: Math.floor(Math.random() * Date.now()).toString(16), name: "", amount: 0 } as People]))
  }
  const updateUser = (id: string, fieldName: string, value: string) => {
    setPeople((ps: People[]) => {
      const i = ps.findIndex(p => p.id === id)
      if (i === -1) return [...ps];
      (ps[i] as any)[fieldName] = value;
      return [...ps]
    })
  }
  const deleteUser = (id: string) => {
    setPeople((ps: People[]) => ps.filter(p => p.id !== id))
  }

  const costList = useMemo<{ froms: People[], to: People }[]>(() => {

    let peopleWhoOwns = people
      .map(p => ({ ...p, toPay: each - p.amount }))
      .filter(p => p.toPay > 0)

    let peopleWhoNeeds = people
      .map(p => ({ ...p, toPay: each - p.amount }))
      .filter(p => p.toPay < 0)


    let arr: any = {}
    for (let i = 0; i < peopleWhoNeeds.length; i++) {
      arr[peopleWhoNeeds[i].id] = {
        froms: [],
        to: peopleWhoNeeds[i],
      }
      for (let j = 0; j < peopleWhoOwns.length; j++) {
        if (peopleWhoOwns[j].toPay === 0) continue;
        if (peopleWhoNeeds[i].toPay > 0) break;

        let amount = +Math.min(Math.abs(peopleWhoNeeds[i].toPay), peopleWhoOwns[j].toPay).toFixed(2);
        if(amount===0)
          continue;
        arr[peopleWhoNeeds[i].id].froms.push({
          ...peopleWhoOwns[j],
          amount
        })
        peopleWhoNeeds[i].toPay += amount;
        peopleWhoOwns[j].toPay -= amount;
      }
    }

    return Object.values(arr)
  }, [each, people])

  return { people, setPeople, addPeople, updateUser, total, each, costList, deleteUser }
}