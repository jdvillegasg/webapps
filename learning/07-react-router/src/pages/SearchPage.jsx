import { useEffect } from "react";
export function SearchPage({ routeParams }) {
  useEffect(() => {
    document.title = `${routeParams.query}`;
  }, []);

  return (
    <>
      <h1>Has buscado</h1>
      <h2>{routeParams.query}</h2>
    </>
  );
}
