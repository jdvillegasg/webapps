import { EVENTS } from "./constants/consts";

export function navigate(href) {
  window.history.pushState({}, "", href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0; // Conventional click
    const isModifiedEvent =
      event.metaKey || event.ctrlKey || event.altKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      // Single Page Application navigation
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
