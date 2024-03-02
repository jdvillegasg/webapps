/* eslint-disable react/prop-types */
import { Filters } from "./Filters"

export function Header ({setterFilter}) {
    console.log("Header", setterFilter)
    return (
        <header>
            <h1>Shop</h1>
            <Filters setterFilter={setterFilter}></Filters>
        </header>
    )
}