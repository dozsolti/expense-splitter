import type { ReactElement } from 'react'
import type { People } from '../types'
import PeopleRow from './PeopleRow'

interface Properties {
  people: People[]
}
export default function PeopleList({ people }: Properties): ReactElement {
  return (
    <div className='my-4 text-white'>
      <h2>People</h2>
      {people.map(user => <PeopleRow user={user} key={user.id} />)}
    </div>
  )
}