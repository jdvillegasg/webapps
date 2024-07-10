/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

// 1. Create the Context
// This is the one that we have to consume
export const FiltersContext = createContext()

// 2. Create the Provider, to provide the Context
// This is the one that provides access to the shared data
export function FiltersProvider ({children}){
    const [filters, setFiltersState] = useState(
        {
            category: 'all',
            minPrice: 0,
        }
    )

    return (
        <FiltersContext.Provider value={{
            filters,
            setFiltersState
        }}>
            {children}
        </FiltersContext.Provider>
    )
}
