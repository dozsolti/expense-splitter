import { useStore } from '../context/StoreContext'
import type { ReactElement } from 'react'
import type { People } from '../types'
import Button from './Button'

interface Properties {
  user: People
}
export default function PeopleRow({ user }: Properties): ReactElement {
  const { updateUser, deleteUser } = useStore()

  const onChange = (fieldName: string, text: string) => {
    updateUser(user.id, fieldName, text)
  }
  return (
    <div className='mb-5'>
      <div className='mb-5 text-white flex items-center gap-x-3'>
        <div style={{ position: 'relative' }}>
          <img alt={`Profile of ${user.name}`} src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`} style={{ maxWidth: "25vw", aspectRatio: 1 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.3 }}>
            <Button title='x' onPress={() => deleteUser(user.id)} />
          </div>
        </div>
        <div className='flex flex-col' style={{ maxWidth: "50vw" }}>
          <input value={user.name}
            placeholder='Name'
            onChange={event => onChange('name', event.target.value)}
            className='rounded-md text-background h-3 border-0 p-2 mb-2 focus:outline-2 focus:outline-primary' style={{ maxWidth: "70%" }} />
          <input value={user.reason}
            placeholder='Reason'
            onChange={event => onChange('reason', event.target.value)}
            className='rounded-md text-background border-0 p-2 focus:outline-2 focus:outline-primary' />
        </div>
        <input value={user.amount}
          placeholder='Amount payed'
          type='number'
          onChange={event => onChange('amount', event.target.value)}
          className='rounded-md text-background border-0 p-2 focus:outline-2 focus:outline-primary' style={{ maxWidth: "25vw" }} />
      </div>
    </div>
  )
}