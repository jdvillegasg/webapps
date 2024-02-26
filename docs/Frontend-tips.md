# Frontend tips

# CSS

CSS class-less frameworks.

They provide over-basic styles to start your application.

Common examples are pages like:

[Bolt CSS](https://boltcss.com/)

[Water CSS](https://watercss.kognise.dev/)

## Flex box layout
**What is it?**
 > "In the flex layout model, the children of a flex container can be laid out in any direction, and can "flex" their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent". [^1]
 
Use the `justifify-content` property to define the distribution of space between and around the **main axis** of the flex container.

The **main axis** is the direction of the flex container defined by the `flex-direction` property. Can be either:
`row`, `row-reverse`, `column`, `column-reverse`.

The **cross axis** is the direction orthogonal to the **main axis**.

Use the `align-items` property to control the alignment of items over the **cross axis**

[^1]: [Flexbox layout CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)

## Grid layout
 > "Like tables, grid layout enables an author to align elements into columns and rows". [^2]

The grid can be controlled by multiple attributes, but some of the common ones are: 

* `grid-template-columns` and `grid-template-rows`define the number and spacing of columns and rows.

!!! info "Grid layout"
    ```jsx
    grid-template-columns: 1fr 2fr 3fr 1fr
    ```

In the example above, the container will have 4 columns such that the 2nd column will be twice the width of the 1st and 4th column and the 3rd column will be three times the width of the 1st and 4th.

!!! info "Grid layout"
    ```jsx
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
    ```

In the example above, we are setting the number of columns in the container based on the available space(`auto-fit`) and how many columns can fit in that space if they are either 200px width or 1 fraction.

* `grid-auto-columns` and `grid-auto-rows` define the size of columns or rows.

!!! info "Grid layout"
    ```jsx
    grid-auto-rows: minmax(30px, auto)
    ```
In the example above, the container rows will be between 30px height each one and the maximum height among the rows in the container.



[^2]: [Grid layout CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)


# HTML

## Good practices
* Encapsulate a `form` element (with its `input` and `button`) within a `header` element, when it works like a search bar, where the results are shown later in the `main` section.

* Always that you use an `input` and a `button` elements, enclosed them in a `form` element

## Tags

`input`

`form` 

When `button` is used with `form`, it should be of type `type="submit"`

# Node.js environment

## Good practice
When fetching a page which returns json objects, create a folder named `mocks` under the `src` folder of the project, and create two types of `.json` files:
* one that serves as an example of a typical response
* one that serves as an example of a not available response

# React

## Required
A list of React components or html elements that is defined in a recursion, like the shown in the following snippet of code:

```jsx title="Wrong listing of React elements/components"
movies.map(x => (
    <li ...>
    ...
    </li>
))
```

requires a `key` property with an unique identifier. In the example above, we would require to change the `<li>` element like this:

```jsx title="Correct listing of React elements/components"
movies.map(x => (
    <li key={uniqueID} ...>
    ...
    </li>
))
```

## Hooks
`#!jsx useRef()` can be used to have a mutable reference to an HTML element.

It works similarly to `#!jsx useState` but doesn't render again the component when its `.current` property, holding the saved value, change.

??? example "useRef example"

    ``` jsx
    const inputRef = useRef()
    <input ref={useRef}></input>
    ```

`#! useMemo()` will execute its body only when the list of dependencies has changed. This could be done also by combining the `useEffect` and the `useRef` hooks.

`#! useCallback()` is like an `useMemo` but for defining a function. Internally it makes use of `useMemo`.

??? example "useCallback example"

    ``` jsx
    useCallback()
    ```

## Syntax / Operators
**Spread syntax**
Access the elements of an iterable. It is useful, for example, when you want to access the elements of an array (that is a React state), but do not want to change the state itself.

??? example "Spread syntax example"

    ``` jsx
    const [movies, setMovies] = useState()
    [...]movies.sort()
    ```
In the code above, `[...]movies.sort()` does not change the state of `movies`, whereas if you use `movies.sort()`, the state of `movies` will change (to the new sorted value).

# JS

## Operators
Optional chaining (`?`) can be used when it is unknown if an object's property or function exists. It tells the system to not throw any error, when it doesn't, and instead returns an `undefined` value.

# Git

??? quote "Check status"
    ```pwsh
    git status
    ```

# Web development
