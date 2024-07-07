import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return (
      <div className="p-2">
        <h1 className='text-2xl'>Welcome Login!</h1>
      </div>
    )
}