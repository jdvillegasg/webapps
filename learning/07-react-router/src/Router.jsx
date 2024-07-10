import { useState, useEffect, Children } from "react";
import { EVENTS } from "./constants/consts";
import { match } from "path-to-regexp";
import { getCurrentPath } from "./utils.js";
export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>ERROR</h1>,
}) {
  const [currPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // Add routes from children <Route/> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currPath) return true;

    // match from path-to-regexp package provides regexp in URL strings
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currPath);

    if (!matched) return false;

    // matched.params is an object corresponding to:
    // /search/:query -> { query: 'queryvalue'}
    routeParams = matched.params;
    return true;
  })?.Component;

  // Pass the URL 'params' to the page components (i.e. <About/>)
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
