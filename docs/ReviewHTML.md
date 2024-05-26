# HTML

## Good practices
* Encapsulate a `form` element (with its `input` and `button`) within a `header` element, when it works like a search bar, where the results are shown later in the `main` section.

* Always that you use an `input` and a `button` elements, enclosed them in a `form` element.

* Check if the context read by the `useContext` hook is undefined, and if so, throw an error.

## Tags

`<input>`

`form` 

When `button` is used with `form`, it should be of type `type="submit"`

 > "The `svg` is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document".[^3]

!!! abstract "svg tag"

    ``` jsx
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
    ```

 > "The <path> SVG element is the generic element to define a shape. All the basic shapes can be created with a path element" [^4]

A form can also be submitted without a button. For instance, by pressing `ENTER` in an input text field, enclosed in a form, the submit event of the form will be triggered.


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

`<main>`

 >"The `main` HTML element represents the dominant content of the `body` of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application". [^8]

 [^8]: [Main tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)

 `<pre>`

 Displays HTML text as it is (as HTML text).