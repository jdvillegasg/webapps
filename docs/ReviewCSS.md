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

`transition: all 0.5s ease`

The entered values correspond to the `property name`, the `duration` and the `easing function`.

`z-index: 1`

Elements with larger `z-index` will cover those with a lower one.

`scale: 0.7`

Transform an element (typically an image) by scaling it (or shrinking it). If two arguments are provided, it specifies the resizing of the element in each axis.

`.cart ~ .cart-button`

The sub-sequent sibling selector, selects all elements that are siblings (belong to the same parent element) of the first element (`.cart` in the title).