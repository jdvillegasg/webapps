TypeScript is just a super set of Javascript to add static types to it.

One of the most important things to remember about TypeScript is that it **does NOT** make any data validation by itself, because TypeScript is not executed in the browser. Since only Javascript is executed in the browser, TypeScript works as a tool to check for type errors only in the code development process.

Basic types are infered by TypeScript and thus are not required to be typed.

# Common functions

`any`

When used this, TypeScript ignores typing.

`typeof`

To get the type of basic types.

`instanceof`

To get the type of instances of classes.

# Functions

## Object params

When the parameter is an object, there are two ways of defining its type:

### First way

```js
function sayHi({name, age}:{name: string, age:number}) {}
```

### Second way

```js
function sayHi( person :{name: string, age: number}){
    const {name, age} = person
}
```

## Function params

The semicolon operator is used to type a function as in a regular parameter. The difference is that an arrow function is used to define the type of the params of the param function and the return type of the param function:

```js
const ssayHiFromCallback = (myfun: (name:string)=>void) =>{
    myfun("Julian)
}

const sayHi = (name:string) =>{
    console.log(name)
}

sayHiFromCallback(sayHi)
```

## Return types

TypeScript does inference on the type of the returned object/value. However, if the return type needs to be explicitly stated, it should be done after the parentheses enclosing the parameters:

```js
function sayHi({name, age}: {name: string, age: number}): number{
    return age
}
```

or in these 2 ways for arrow functions:

```js
const sayHi = ({name, age}: {name: string, age: number}, verbose:string): number =>{
    return age
}
```

or 

```js
const sayHi : ({name, age}: {name: string, age: number}, verbose:string) => number = ({name, age}, verbose) =>{
    return age
}
```

# Type Alias

The type of the object is defined by using the keyword `type` as in:

```js
type Hero = {
    name: string
    age: number
}
```

Notice that there is no comma in between the object keys.

Later we can use this type definition in our code:

```js
let hero: Hero = {
    name: "thor",
    age: 1500
}

function createHero(name: string, age: number):Hero {
    return {name, age}
}

const thor = createHero("Thor", 1500)

// Or equivalently
function createHero (myhero: Hero):Hero {
    const {name, age} = myhero
    return {name, age}
}

const ironman = createHero({name:"ironman", age: 45})
```

## Optional properties

By passing the operator `?` to the key in an object type definition, the key is defined as an optional property that might be used or not. 

```js
type Hero = {
    name: string
    age: number
    isActive?: boolean
}

function createHero(myhero: Hero):Hero {
    const {name, age} = myhero
    // The property isActive of the type Hero is used here, since we  in the function definition its return type was defined to be of Hero type.
    return {name, age, isActive: true} 
}
```

## I/O in properties

Properties can be defined to be `readonly`, ``  and `` in object type defintion. For example in the following case, we will have issues :

```js
type Hero = {
    id?: number
    name: string
    age: number
    isActive: boolean
}
function createHero(myhero: Hero):Hero {
    const {name, age} = myhero
    return {name, age, isActive: true}
}
const thor = createHero({name: "ironman", age:45})

thor.id = 5547
```

Despite `id` being a property of the object type `Hero`, when defining the function `createHero` the returned object did not include it.

We can therefore avoid this happening by defining the property `id` as a `readonly` property:

```js
type Hero = {
    readonly id?: string
    name: string
    age: number
    isActive?: boolean
}
```

## Template Union Types

Below is an example of usage of the template union types for creating an id that is expected to be a concatenation of 5 strings with `-` in between them.

```js
type HeroId = `${string}-${string}-${string}-${string}-${string}`

type Hero = {
    readonly id?: HeroId
    name: string
    age: number
    isActive?: boolean
}
```

## Union types

As seen in the example below, the `|` operator allows to the type to be defined as of a union of different types.

```js
type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal' | 'omnipresent'
```

Note that in the example the types are *specific* string types (i.e. `planetary`), which means that, for example, the assignation ``let jhon: HeroPowerScale = 'high'```will throw a TypeScript error.

## Intersection types

Useful for extending types.

```js
type HeroBasicInfo = {
    name: string
    age: number
}

type HeroExtendedInfo = {
    readonly id?: HeroId
    isActive?: boolean
    powerScale?: HeroPowerScale
}

type Hero = HeroBasicInfo & HeroExtendedInfo

function createHero(myhero: HeroBasicInfo): Hero {
    const {name, age} = myhero
    return {id: crypto.randomUUID(), name, age, isActive: true}
}
```

## Type Indexing

```js
type HeroProperties = {
    isActive?: boolean
    address: {
        planet: string
        city: string
    }
}

const addressHero: HeroProperties['address'] = {
    planet: "earth",
    city: "Cali"
}
```

## Arrays

```js
// One way to define the type
const languages: string[] = []

// Another way to define the type
const languages: Array<string> = []

// Union type in the array definition
const languages: (string | number)[] = []

// Array of your own types
const heroes: Hero[] = []
```

## Array of arrays and tuples

```js
type CellValue = 'O' | 'X' | ''
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]
const gameBoard: GameBoard = [
    ['X', 'O', 'X'],
    ['O', '', ''],
    ['X','','O']
]
```

Example of a tuple in React:

```jsx
type State = [string, (newName: string)=> void]
const [hero, setHero] = useState("thor")
```

### Static tuple

```js
type RGB = readonly [number, number, number]
```

## Enums

Can be compiled to Javscript, depending on how they are defined. If defined as follows, *they will be compiled*

```js
enum ERROR_TYPES = {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}
```

If defined as follows, *the will NOT be compiled*:

```js
const enum ERROR_TYPES = {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}
```

# Type assertions

```js
// We loose the "null" return type when asserting it is an HTMLCanvasElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement
// x THIS IS WRONG, because getElementById can return a "null":
const canvas : HTMLCanvasElement = document.getElementById('canvas')
// Even this will give a TypeScript error
const canvas : HTMLCanvasElement | null = document.getElementById('canvas')
```

A good practice is to assert the type of the `HTMLElement` return type of `getElementById`, **after** we check it is not null:

```js
if (canvas !== null){
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')
}
```

However, if by an accident or mistake the developer retrieves a different element than a canvas:

```js
const canvas = document.getElementById("span")
```

when executing the assertion `canvas as HTMLCanvasElement` there will be a JavaScript error that TypeScript was not able to detect. We can therefore,
further check that the return element is a canvas element by using `instanceof`:

```js
if (canvas !== null && canvas instanceof HTMLCanvasElement){
    ...
}
```

## Assertions when fetching

```js
const API_URL = "https://api.github.com/search/repositories?q=javascript"
const response = await fetch(API_URL)
if(!response.ok){
    throw new Error("request failed)
}
const data = await response.json()
const repos = data.items.map(repo=> {console.log(repo)})
```

In the example above TypeScript infers the type of `response` since it knows the return type of the native `fetch` function. However, it *doesn't* know the type of `data` since the json returned by `response.json` can have properties of any type. Precisely `any` is the type infered by TypeScript for `data`. 

A first step to type `data` would be:

```js
// Array of opjects
type GithubAPIResponse = {
    items: object[]
}

//...

const data = await response.json() as GithubAPIResponse
```

# Interfaces

Its usage is similar to the the use of `type`, but have minor differences inclusions. For example, we first define a `Shoe`type using intersection types:

```js
type Product {
    id: number
    name: string
    price: number
    quantity: number
}
type Size {
    size: number
}

type Shoe = Product && Size
```

and now, using Interfaces:

```js
interface Product {
    id: number
    name: string
    price: number
    quantity: number
}
interface Shoe extends Product {
    size: number
}
``` 

Example of using Interface for defining function types:

```js
interface Cart {
    add: (product: Product)=> void
    remove: (id: number) => void
    clear: () => void
}
```

# Narrowing

Due to the use of Union types, no shared properties between the types in the union would be detected as errors by TypeScript, if the developer tries to access them without *narrowing* the type:

```js
interface Mario {
    company: "nintendo"
    nombre: string
    saltar: () => void
}
interface Sonic {
    company: "sega"
    nombre: string
    corre: () => void
}
type Character = Mario | Sonic
function play(character: Character){
    // THIS WILL GIVE AN ERROR
    console.log(character.saltar())
}
```

In the example above, the parameter `character`has been defined as an union of the types `Mario`and `Sonic`. Thus, when trying to access the property `saltar` of the interface `Mario`, TypeScript will return an error, because `character` could also be of type `Sonic`, and `Sonic` types don't have the `saltar`property.

# Type guard

```js
function checkIsSonic(character: Character): character is Sonic {
    return(character as Sonic).corre !== undefined
}
```

# Utility types

## ReturnType

Useful to retrieve the type of a function:

```js
function createAddress() {
    return {
        planet: "earth",
        city: "Cali"
    }
}

type Address = ReturnType<typeof createAddress>
```

Note that in the example above, TypeScript is doing inference on the return type of the function.


# React with TypeScript
## Props
To type the props in a React component, we can make use of the library `React.FC`. 

First we define an interface where the props types are defined:

```tsx
interface Todo {
    id: number
    title: string
}
type ListOfTodos = Todo[]

interface Props {
    todos: ListOfTodos
}
function App: React.FC<Props> ({todos}){
    //...
}
```

The syntax `<>` in `React.FC<Props>` is serves to pass a parameter having the type of the props.

## Imports

Let's say we define types and interface in a file called `types.d.ts` and we want to import in a given file. To import TypeScript types and interfaces, we must add the keyword `type` to the interface we are importing:

```tsx
import { type ListOfTodos } from "../types.d.ts"
```
or equivalently

```tsx
import type { ListOfTodos } from "../types.d.ts"
```

## Typing events

```tsx
const handleClick = (event: React.ChangeEvent<HTMLInputElement>): void=>{
    // Corpus
}
<input onClick={(e)=> handleClick(e)}>
```

## Typing states

We have to use the syntax `<>` after using the `useState` hook, to let TypeScript know that the inference it (probably) does on the initial value we pass to the hook is not always the type of the state. Precisely, in between `<>` we define the type for the state values.

```tsx
const [filterState, setFilterState] = useState<FilterValue>("all")
```

## More

`as const`

```tsx
export const TODO_FILTERS = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
} as const
```

The keyword "as cost" in TypeScript, makes `TODO_FILTERS` (in the example above) a read-only constant.

`typeof`

Get the types of an existing dictionary `TODO_FILTERS`

```tsx
typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
```