import Button from '../components/Button'
import PeopleList from '../components/PeopleList'
import SimpleView from '../components/SimpleView'
import { useStore } from '../context/StoreContext'

export default function Home() {
  const { people, addPeople, total, each } = useStore()

  return (
    <div className='flex flex-col items-center m-4'>
      <h1 className='text-4xl mb-6'>Expense splitter</h1>

      <SimpleView />

      <div className='my-6'>
        <PeopleList people={people} />
        <div className='items-center flex justify-between'>
          <Button title="+ Add people" onPress={addPeople} />
          <div className='text-right'>
            <span className='text-xl'>Total: ${total}</span><br />
            <span className='font-light'>per: ${each}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
