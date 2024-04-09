import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "./Router";
import { Link } from "./Link";
import { Route } from "./Route";
import { getCurrentPath } from "./utils";
import { waitFor } from "@testing-library/dom";

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  // Clean the screen after each test
  beforeEach(() => {
    cleanup();

    // Clear all mocks
    vi.clearAllMocks();
  });

  it("should render without problems", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);

    // Searches a component whose having the text given by params
    expect(screen.getByText(404)).toBeTruthy();
  });

  it("should render the component of the first route that matches", () => {
    getCurrentPath.mockReturnValue("/about");

    const routes = [
      {
        path: "/about",
        Component: () => <h1>About</h1>,
      },
      {
        path: "/",
        Component: () => <h1>Home</h1>,
      },
    ];

    render(<Router routes={routes} />);
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("should navigate using the Links", () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to about</Link>
              </>
            );
          }}
        />
        <Route path="/about" Component={() => <h1>About</h1>} />
      </Router>
    );

    // Click on the link
    const button = screen.getByText(/Go to about/);
    fireEvent.click(button);

    const aboutTitle = screen.findByText("About");

    // Check that the new route is rendered
    expect(aboutTitle).toBeTruthy();
  });
});
