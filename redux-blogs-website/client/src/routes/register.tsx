import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register
})

function Register() {
  return (
      <div className="p-2">
        <h1 className='text-2xl'>Welcome REgister!</h1>
      </div>
    )
}