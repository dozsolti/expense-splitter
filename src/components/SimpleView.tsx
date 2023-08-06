import type { ReactElement } from 'react'
import { useStore } from '../context/StoreContext'
import SimpleViewRow from './SimpleViewRow'

export default function SimpleView(): ReactElement {
  const { costList } = useStore()

  if (costList.length === 0)
    return (<></>);

  return (
    <div className='my-4 text-white text-center'>
      <h2>Simple View</h2>
      {costList.map(item => (item.froms.map(row => (
        <SimpleViewRow key={row.id + "-" + item.to.id} from={row} to={item.to} />
      ))))}
    </div>
  )
}