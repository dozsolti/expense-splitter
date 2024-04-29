import type { ReactElement } from 'react'
import type { People } from '../types'
import PeopleRow from './PeopleRow'

interface Properties {
  people: People[]
}
export default function PeopleList({ people }: Properties): ReactElement {

  if (people.length === 0)
    return (<></>);
  return (
    <div className='my-4 text-white'>
      <h2>People</h2>
      {people.sort((a, b) => {
        if(a.amount===0) return 1;
        if(b.amount===0) return -1;
        return a.name.localeCompare(b.name)
        }).map(user => <PeopleRow user={user} key={user.id} />)}
    </div>
  )
}