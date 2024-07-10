/* eslint-disable react/prop-types */
import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'

export function Filters (){
    const {filters, setFiltersState} = useFilters()
    
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) =>{
        setFiltersState(previousState => (
                {...previousState, 
                    minPrice: event.target.value
                }
            )
        )
    }

    const handleChangeCategory = (event) =>{
        setFiltersState(previousState => (
            {...previousState, 
                category: event.target.value
            }
        )
    )
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input type='range'
                      id={minPriceFilterId}
                      min='0'
                      max='1000'
                      onChange={handleChangeMinPrice}
                      value={filters.minPrice}></input>
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categories</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value='all'>All</option>
                    <option value='laptops'>Laptops</option>
                    <option value='smartphones'>Smartphones</option>
                    <option value='home-decoration'>Home decoration</option>
                </select>
            </div>
        </section>
    )
}