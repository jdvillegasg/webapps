import { useEffect, useState } from "react"

const CAT_PREFIX_URL = 'https://cataas.com/cat/'

/*
Creamos un CUSTOM HOOK (usando el prefijo 'use' en el nombre de la funcion)
para poder usar hooks dentro de la funcion.

Esta funcion (este custom hook) es REUTILIZABLE POR FUERA
DEL CUERPO DEL COMPONENTE
 */
export function useCatImg ({factState}) {
    const [catImageUrl, setCatImageUrl] = useState()

    useEffect (() => {
        if (!factState) return
        const firstThreeWord = factState.split(' ').slice(0,3).join(' ')
            
        fetch(`${CAT_PREFIX_URL}/says/${firstThreeWord}?json=true`)
            .then(response => response.json())
            .then(data => {
                const {_id} = data
                console.log(_id, typeof _id)
                setCatImageUrl(`${_id}/says/${firstThreeWord}`)
            })        
        console.log("Adentro")
        }, [factState])
    return {catImageUrl: `${CAT_PREFIX_URL}${catImageUrl}`}
}