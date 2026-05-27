import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from 'expo-location';

const ConfigContext = createContext()

export function ConfigProvider({ children }) {
    const [idioma, setIdioma] = useState('')
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

        if (!data) {
            setIdioma('ninguno')

        } else {
            const idioma = JSON.parse(data)
            setIdioma(idioma.idioma)
        }

        const fuente = await AsyncStorage.getItem('fuente')

        if (!fuente) {
            setFuente(22)
        } else {
            const fuenteJson = JSON.parse(fuente)

            setFuente(fuenteJson.fuente)
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