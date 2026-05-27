import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from 'expo-location';

const ConfigContext = createContext()

export function ConfigProvider({ children }) {
    const [idioma, setIdioma] = useState('us')
    const [fuente, setFuente] = useState(22)

    const guardarIdioma = async (idioma) => {
        await AsyncStorage.setItem('idioma', JSON.stringify({ idioma: idioma }));
        setIdioma(idioma)
    }

    const guardarFuente = async (fuente) => {
        if(fuente < 12){
            setFuente(12)
            return
        } else if(fuente > 35){
            setFuente(35)
            return
        }
        await AsyncStorage.setItem('fuente', JSON.stringify({ fuente: fuente }));

        setFuente(Number(fuente))
    }

    const cargarDatos = async () => {
        const data = await AsyncStorage.getItem('idioma')
        const idiomaJson = JSON.parse(data)

        if (!idiomaJson) {
            setIdioma('us')
        } else {
            const idiomaR = JSON.parse(data)
            setIdioma(idiomaR.idioma)
        }

        const fuente = await AsyncStorage.getItem('fuente')
        const fuenteJson = JSON.parse(fuente)

        if (!fuenteJson) {
            setFuente(22)
        } else {
            const fuenteR = JSON.parse(fuente)

            setFuente(fuenteR.fuente)
        }


    }

    useEffect(() => {

        cargarDatos()
    }, [])

    return (
        <ConfigContext.Provider value={{ idioma, fuente, guardarIdioma, guardarFuente }}>
            {children}
        </ConfigContext.Provider>
    )
}

export const useConfig = () => useContext(ConfigContext);