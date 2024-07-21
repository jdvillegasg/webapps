import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/foods")({
  component: Foods,
});

function Foods() {
  return (
    <div className="p-2">
      <h1 className="text-2xl">Welcome to Foods!</h1>
    </div>
  );
}
