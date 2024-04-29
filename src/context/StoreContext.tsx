import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import type { People } from '../types';

interface ContextProps {
  people: People[],
  setPeople: Dispatch<SetStateAction<People[]>>
}
const StoreContext = createContext<ContextProps>({
  people: [],
  setPeople: () => { }
})

const testData1 = [{
  id: '1',
  name: 'Matyi',
  amount: 227.25
},
{
  id: '2',
  name: 'Peti',
  amount: 115.35
},
{
  id: '3',
  name: 'Zse',
  amount: 675.27
},
{
  id: '4',
  name: 'Gergo',
  amount: 100
},
{
  id: '5',
  name: 'Clau',
  amount: 0
},
{ id: '6', name: 'Kozsi', amount: 0 },
{ id: '7', name: 'Kevin', amount: 0 },
{ id: '8', name: 'Leo', amount: 0 },
{ id: '9', name: 'Mark', amount: 0 },
{ id: '10', name: 'Medve', amount: 0 },
{ id: '11', name: 'Edi', amount: 0 },

]
const testData2 = [{
  id: '1',
  name: 'Matyi',
  amount: 227.25
},
{
  id: '2',
  name: 'Peti',
  amount: 115.35
},
{
  id: '3',
  name: 'Zse',
  amount: 675.27
},
{
  id: '4',
  name: 'Gergo',
  amount: 50
},
{ id: '6', name: 'Kozsi', amount: 0 },
{ id: '7', name: 'Kevin', amount: 0 },
{ id: '8', name: 'Leo', amount: 0 },
{ id: '9', name: 'Mark', amount: 0 },
{ id: '11', name: 'Edi', amount: 0 },

]

const testData3 = [
  {
    id: '1',
    name: 'Zse',
    amount: 50
  },
  {
    id: '2',
    name: 'Zse',
    amount: 200
  },
  {
    id: '3',
    name: 'Peti',
    amount: 0
  },
]
const testData4: People[] = [
  {
    id: '1',
    name: 'Zse',
    amount: 525.44,
    reason: "Kaja + pia"
  },
  {
    id: '2',
    name: 'Zse',
    amount: 99.83,
    reason: "Mici"
  },
  {
    id: '3',
    name: 'Zse',
    amount: 50,
    reason: "papir faszsagok"
  },

  {
    id: '4',
    name: 'Peti',
    amount: 23.96,
    reason:'kenyer',
  },
  {
    id: '5',
    name: 'Peti',
    amount: 91.39,
    reason:'csirke',
  },
  {
    id: '6',
    name: 'Matyi',
    amount: 51.12,
    reason:'reggeli',
  },
  {
    id: '7',
    name: 'Matyi',
    amount: 176.13,
    reason:'pia',
  },
  {
    id: '8',
    name: 'Gergo',
    amount: 50,
    reason:'otthoni cuccok',
  },
  {id:'9', name: 'Kozsi', amount:0},
  {id: '11', name: 'Kevin', amount:0},
  {id:'12', name: 'Leo', amount:0},
  {id:'13', name: 'Mark', amount:0},
  {id:'14', name: 'Edi', amount:0},
]
export function StoreProvider({ children }: { children: ReactElement }) {
  const [people, setPeople] = useState<People[]>(testData4)

  return (
    <StoreContext.Provider value={{ people, setPeople }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const { people, setPeople } = useContext(StoreContext)

  const uniquePeople = useMemo(()=>{
    return Object.entries<People>(people.reduce((t, v) => {

      if (v.name in t)
        t[v.name].amount += +v.amount;
      else
        t[v.name] = {...v}

      return t;
    }, {} as any)).map(x => x[1]);
  }, [people])

  const total = +(people.reduce((t, v) => +t + +v.amount, 0)).toFixed(2)
  const each = +(total / (uniquePeople.length || 1)).toFixed(2)

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

    let peopleWhoOwns = uniquePeople

      .map(p => ({ ...p, toPay: each - p.amount }))
      .filter(p => p.toPay > 0)

    let peopleWhoNeeds = uniquePeople
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
        if (amount === 0)
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