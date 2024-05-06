# JS
## Operators
**Optional chaining (`?`)**

Can be used when it is unknown if an object's property or function exists. It tells the system to not throw any error, when it doesn't, and instead returns an `undefined` value.

**Spread syntax**

Access the elements of an iterable. It is useful, for example, when you want to access the elements of an array (that is a React state), but do not want to change the state itself.

!!! example "Spread syntax example 1"

    ``` js
    const [movies, setMovies] = useState()
    [...]movies.sort()
    ```
In the code above, `[...]movies.sort()` does not change the state of `movies`, whereas if you use `movies.sort()`, the state of `movies` will change (to the new sorted value).

!!! example "Spread syntax example 2"

    ``` js
    const animal = {'name': 'elephant', 'size': 150}
    {...animal, size: 450}
    // Last line returns:
    // {name: 'elephant', size: 450}
    ```

## Common methods

`slice(start, end-1)` 

Access the elements indexed by params of an array.

!!! tip "Use of slice"

    ```js
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    console.log(animals.slice(2,4))
    Array ['camel', 'duck']
    ```

`structuredClone(value)`

Creates a deep clone (a copy) of a given value.

Use case:

When a state must be changed but can't be modified directly.

`window.history.pushState()`

Adds an entry to the browser's session history.

`filter(Boolean)` trick

The filter method iterates over an array and returns the entries of the array fulfilling the condition. 

If we have an array of objects and want to access one of the object's key, if the array has also `null` or `undefined` entries, the filter method won't work. We can then execute the `filter(Boolean)` "trick" to remove those type of entries and then perform the normal filtering we planned to do.

```js
const array = [{ good }, null, { great }, undefined]
 
const truthyArray = array.filter(Boolean)
// truthyArray = [{ good }, { great }]
```

`map` 

Can be used as well for Objects by retrieving the key/value pairs of the object:

```js
Object.entries(myObject).map(([key, val])=>{
... // the code to execute on each object entry
})
```

## Events

`dispatchEvent()`

 > "Unlike "native" events, which are fired by the browser and invoke event handlers asynchronously via the event loop, `dispatchEvent()` invokes event handlers synchronously. All applicable event handlers are called and return before `dispatchEvent()` returns" [^1] 
 
[^1]: [Dispatch Event](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)

Users can create their own events by invoking the class ``Event`` and dispatch the event in the `DOM`:

!!! tip "Create a custom event"
    ```js
        const myEvent = new Event('event-name)
        window.dispatchEvent(myEvent)
    ```

`pushstate`

Event of the History interface that adds an entry to the browser's session history.

`popstate`

Event of the Window interface that is fired when the user pushes the `back`button in the browser 

`preventDefault()`

Event default action would not be performed, so that the developer handles it.

`Modified events`

Modified events are events trigger by an user interaction (i.e. a click) that also are modified by another user interaction (i.e. user presses the `CTRL`key in the keyboard, while clicking).

`Event bubbling`

In a component with nested elements the deeper element will trigger the event and subsequente outer elements will trigger their respective events (if any).

 >"The most deeply nested element that caused the event is called a target element, accessible as `event.target`" [^2]

[^2]: [Event bubbling](https://javascript.info/bubbling-and-capturing)

## Web API

`FileReader()`

Lets web applications reade asynchronously the contents of files. 

 > "FileReader can only access the contents of files that the user has explicitly selected, either using an HTML <input type="file"> element or by drag and drop. It cannot be used to read a file by pathname from the user's file system. To read files on the client's file system by pathname, use the File System Access API. To read server-side files, use fetch(), with CORS permission if reading cross-domain." [^2]

 [^2]: [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

`FormData()`

 >"The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch(), XMLHttpRequest.send() or navigator.sendBeacon() methods." [^3]

[^3]: [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)