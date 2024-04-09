<h1 style="color: #000;font-family:'system-ui';font-weight:bold">Goals of the project</h1>

* Create a way of making SPAs (Single Page Applications)
* Functionality to navigate among pages by pressing web browser's `back` button.

<h1 style="color: #000;font-family:'system-ui';font-weight:bold">Code progress</h1>

## First approach
A first approach to redirect the user to another page when the page hyperlink is clicked, would be to use *conditional rendering* as shown below.

??? example "Redirect pages"
    ```
    /* Define the pages with components*/
    function HomePage() {
        return (<></>)
    }
    function AboutPage() {
        return (<></>)
    }
    
    function App(){
        const [currPath, setCurrPath] = useState(window.location.pathname)

        /* Use conditional rendering to redirect to About and Home pages */
        <main>
            {currPath === '/' &&  <HomePage></HomePage> }
            {currPath === '/about' &&  <AboutPage></AboutPage> }
        </main>
    }
    export default App
    ```

However, in this way, the whole page is being rendered each time the user clicks in an hyperlink.

## Second approach

To cope for this we create a ``navigate`` method with the following functionality:

* Change the URL 
* Create a new event
* Dispatch the event for whichever (element) wanting to listen it.

??? example "navigate method"
    ```js
    const NAVIGATION_EVENT = 'pushstate'
    function navigate(href) {
        window.history.pushState({}, '', href)
        const navigationEvent = new Event(NAVIGATION_EVENT)
        window.dispatchEvent(navigationEvent)
    }
    ```

Then an ``useEffect()`` is used to bind the event listener to a callback, only when the page is loaded (empty dependencies).

??? example "Bind event listener to callback"
    ```jsx
    useEffect(() => {
        const onLocationChange = () =>{
            setCurrPath(window.location.pathname)
        }

        window.addEventListener(NAVIGATION_EVENT, onLocationChange)

        //remove the event
        return () => {
            window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
        }
    }, [])
    ```

And finally, in this second approach, the user will trigger the event (call the ``navigate`` method) by pressing a button, provoking the callback defined in the ``useEffect()``. The callback just sets the ``currPath`` state defined in our previous approach.

??? example "trigger the event with user interaction"
    ```jsx
    `<button onClick={()=>navigate('/')}>`Go to Home`</button>`
    ...
    `<button onClick={()=>navigate('/about')}>`Go to About`</button>`
    ```

To see how this changes have actually affected the loading behaviour in the web browser, next animation shows that when pressing the `Go to about` button, only the required information is loaded into the page (in this case the picture):

<figure markdown="span">
  ![Image title](assets/react-router-consecutive-approach-2-loadingpages.gif){ width="600" }
  <figcaption>Only required data is loaded</figcaption>
</figure>

## Third approach

Up to now, the buttons that redirect to other pages, don't allow the user to open the links in new browser windows or tabs, since there is no menu available when the user right-clicks on them, or when the user presses `command` + click.

This is the reason why it is not advisable to use a button as the element providing navigation to different routes.

**To overcome that** we replace the button with an anchor element.

And to avoid the default action of the anchor (to load the entire page again), we call the `preventDefault()` method inside the anchor click event handler (`handleClick()`).

## Testing with vitest, happy-dom and testing-library

The first test detects if our `Router` component doesn't render at all:

```js
it("should render without problems", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });
```

The second test detects if the `404` component is rendered when the user enters an URL that wasn't considered:

```js
 it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);

    // Searches a component whose having the text given by params
    expect(screen.getByText(405)).toBeTruthy();
  });
```

The third test detects if the corresponding componet for the input URL is rendered:

```js
vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

...

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
```