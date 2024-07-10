import "./App.css";
import { Router } from "./Router.jsx";
import Page404 from "./pages/404.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { Route } from "./Route.jsx";
import { Suspense, lazy } from "react";

// Just loads the javascript that we need
const LazyHomePage = lazy(() => import("./pages/Home.jsx"));
const LazyAboutPage = lazy(() => import("./pages/About.jsx"));

const appRoutes = [
  {
    path: "/search/:query", // dynamic route
    Component: SearchPage,
  },
  {
    path: "/:lang/about",
    Component: LazyAboutPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage}></Route>
          <Route path="/about" Component={LazyAboutPage}></Route>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
