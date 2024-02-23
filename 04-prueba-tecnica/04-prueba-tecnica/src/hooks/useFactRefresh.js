import { useState, useEffect } from "react"
import {getRandomCatFact} from '../services/facts.js'

/*
Creamos un CUSTOM HOOK (usando el prefijo 'use' en el nombre de la funcion)
para poder usar hooks dentro de la funcion.

Esta funcion (este custom hook) es REUTILIZABLE POR FUERA
DEL CUERPO DEL COMPONENTE
 */
export function useFactRefresh () {
    // Estado para el hecho aleatorio
    const [factState, setFactState] = useState()

    const refreshRandomFact = () => {
        getRandomCatFact().then((result)=> setFactState(result))
    }

    // Fetch de la primera API
    useEffect(refreshRandomFact, [])

    return {factState, refreshRandomFact}
}