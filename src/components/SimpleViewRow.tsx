import type { ReactElement } from 'react'
import type { People } from '../types'

interface Properties {
  from: People,
  to: People
}
export default function SimpleViewRow({ from, to }: Properties): ReactElement {

  return (
    <div className='my-2 text-white flex items-center gap-x-3'>
      <div className='flex flex-col gap-2 items-center md:flex-row'>
        <img alt={`Profile of ${from.name}`} src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${from.name}`} style={{ maxWidth: "25vw", aspectRatio: 1 }} />
        <span>{from.name}</span>
      </div>
      <span className='font-thin'>has to give <span className='font-bold'>${from.amount}</span> to</span>
      <div className='flex flex-col gap-2 items-center md:flex-row'>
        <img alt={`Profile of ${to.name}`} src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${to.name}`} style={{ maxWidth: "25vw", aspectRatio: 1 }} />
        <span>{to.name}</span>
      </div>

    </div>
  )
}