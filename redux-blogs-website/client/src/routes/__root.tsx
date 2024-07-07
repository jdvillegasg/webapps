import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
    <div className="flex flex-row justify-end px-4">
      <div className="px-2 py-4 flex flex-row gap-6 justify-end mx-auto text-2xl w-4/5">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/blogs" className="[&.active]:font-bold">
          Blogs
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/contact" className="[&.active]:font-bold">
          Contact
        </Link>
      </div>
      <div className="px-2 py-4 flex flex-row gap-6 justify-end mx-auto text-2xl w-1/5">
      <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
        <Link to="/register" className="[&.active]:font-bold">
          Register
        </Link>
      </div>
    </div>      
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
