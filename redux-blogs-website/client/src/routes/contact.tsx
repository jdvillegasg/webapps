import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: Contact
})

function Contact() {
  return (
      <div className="p-2">
        <h1 className='text-2xl'>Welcome Contact!</h1>
      </div>
    )
}