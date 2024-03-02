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
 
`justify-content: space-between`

Use the `justifify-content` property to define the distribution of space between and around the **main axis** of the flex container.

<figure markdown="span">
  ![Image title](assets/justify-content-css.gif){ width="400" }
  <figcaption>change due to justify-content</figcaption>
</figure>

The **main axis** is the direction of the flex container defined by the `flex-direction` property. Can be either:
`row`, `row-reverse`, `column`, `column-reverse`.

The **cross axis** is the direction orthogonal to the **main axis**.

Use the `align-items` property to control the alignment of items over the **cross axis**

!!! info "Flex layout example"
    ```jsx
    display: flex
    justify-content: space-between
    flex-direction: row
    align-items: center
    ```
In the example above, the children of the flex container will be placed in a row. They will be placed in the **cross axis** (the height direction) at the center of the container.

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

## Properties

`aspect-ratio: 16/9` 

Indicates the width to height ratio of an element's box. It can be used to cope for the differences in widths or heights of the elements of a container.

<figure markdown="span">
  ![Image title](assets/aspect-ratio-css.gif){ width="400" }
  <figcaption>change due to aspect-ratio</figcaption>
</figure>

For example, in the picture above, the elements in a grid layout container, have different heights, but by setting the same aspect-ratio to all the elements of the container, they will have the same height.

`object-fit: cover`

Sets how the element's content should be resized to fit its container.

<figure markdown="span">
  ![Image title](assets/object-fit-css.gif){ width="400" }
  <figcaption>change due to object-fit</figcaption>
</figure>

Continuing with the previous example, the `aspect-ratio` was able to make the elements of the container of the same height, but it distorted the original images. To cope for this, `object-fit` resizes the image again (zooms in) to alleviate the distortion while keeping the same element's height.

`backdrop-filter: blur(10px)`

 >"Lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything behind the element, to see the effect the element or its background needs to be transparent or partially transparent" [^6]

 [^6]: [Backdrop filter property](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

# HTML

## Good practices
* Encapsulate a `form` element (with its `input` and `button`) within a `header` element, when it works like a search bar, where the results are shown later in the `main` section.

* Always that you use an `input` and a `button` elements, enclosed them in a `form` element.

## Tags

`<input>`

`form` 

When `button` is used with `form`, it should be of type `type="submit"`

 > "The `svg` is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document".[^3]

!!! example "svg tag"

    ``` jsx
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
    ```

 > "The <path> SVG element is the generic element to define a shape. All the basic shapes can be created with a path element" [^4]

[^3]: [SVG tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg)

[^4]: [Path SVG tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)

`<label>`

Represents a caption for an item, that can be used with an `<input>` element. The attribute `for`(or `htmlFor`) should be the value of the `id` attribute of the `<input>` element.


Use cases:
 > "When a user clicks or touches/taps a label, the browser passes the focus to its associated input (the resulting event is also raised for the input)" [^5] 

[^5]: [Usability label tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)

`<header>`

Banner-like element for introductory information.

Use cases:
 * Define a global site header
 * Banner with logo, company name, search bar.

`<select>`

Provides a menu with different options to choose from.

`<option>`

Is used with the `<select>` element. Specifies an option to select. Its `value` attribute specifies the value to be used by the server when that option is chosen.

`<footer>`

Footer element, typically containing information about authorship, copyright data, contact and more.

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
`#!jsx useState()`

Holds something (can be an object, an array,...), that when changed by the the setter function, renders the component.

!!! example "useState good example"
    ```jsx
    const [count, setCount] = React.useState(0)
    const incrementCount = () => setCount((previousCount) => previousCount + 1)
    // Last line is equivalent to:
    const incrementCount = () => setCount(count + 1)
    ```

In the example above, the feature of passing a function to the `useState` whose argument is the last value of the state, is called **functional update**.

`#!jsx useRef()` 

Can be used to have a mutable reference to an HTML element. It works similarly to `#!jsx useState` but doesn't render again the component when its `.current` property, holding the saved value, change.

??? example "useRef example"

    ``` jsx
    const inputRef = useRef()
    <input ref={useRef}></input>
    ```

`#!jsx useMemo()`

Will execute its body only when the list of dependencies has changed. This could be done also by combining the `useEffect` and the `useRef` hooks.

`#!jsx useCallback()` 

Is like an `useMemo` but for defining a function. Internally it makes use of `useMemo`.

??? example "useCallback example"

    ``` jsx
    useCallback()
    ```

`!#jsx useId()`

Will create an unique ID based on the order in which the components are called.

## Syntax / Operators
**Spread syntax**

Access the elements of an iterable. It is useful, for example, when you want to access the elements of an array (that is a React state), but do not want to change the state itself.

!!! example "Spread syntax example 1"

    ``` jsx
    const [movies, setMovies] = useState()
    [...]movies.sort()
    ```
In the code above, `[...]movies.sort()` does not change the state of `movies`, whereas if you use `movies.sort()`, the state of `movies` will change (to the new sorted value).

!!! example "Spread syntax example 2"

    ``` jsx
    const animal = {'name': 'elephant', 'size': 150}
    {...animal, size: 450}
    // Last line returns:
    // {name: 'elephant', size: 450}
    ```

# JS

## Operators
**Optional chaining (`?`)**

Can be used when it is unknown if an object's property or function exists. It tells the system to not throw any error, when it doesn't, and instead returns an `undefined` value.

## Common methods

`slice(start, end-1)` 

Access the elements indexed by params of an array.

!!! tip "Use of slice"

    ```js
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    console.log(animals.slice(2,4))
    Array ['camel', 'duck']
    ```

# Git

??? quote "Check status"
    ```pwsh
    git status
    ```

# Web development
