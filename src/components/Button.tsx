import type { ReactElement } from 'react'

interface Properties {
  title: string,
  onPress: React.MouseEventHandler<HTMLButtonElement>
}
export default function Button({ title, onPress }: Properties): ReactElement {
  return (
    <button
      className='bg-primary text-background px-4 py-2 rounded-full font-bold'
      type='button'
      style={{ width: "fit-content" }}
      onClick={onPress}
    >
      {title}
    </button>
  )
}