import { Link } from "../Link.jsx";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Example of how to create a React Router from scratch</p>
      <Link to="/about">Go to About</Link>
    </>
  );
}
