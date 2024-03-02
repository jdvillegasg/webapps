/* eslint-disable react/prop-types */
import './Filters.css'
import { useState, useId } from 'react'

export function Filters ({setterFilter}){
    console.log('Filters', setterFilter)
    const [minPrice, setMinPrice] = useState(0)

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) =>{
        setMinPrice(event.target.value)
        setterFilter(previousState => (
                {...previousState, 
                    minPrice: event.target.value
                }
            )
        )
    }

    const handleChangeCategory = (event) =>{
        setterFilter(previousState => (
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
                      onChange={handleChangeMinPrice}></input>
                <span>${minPrice}</span>
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