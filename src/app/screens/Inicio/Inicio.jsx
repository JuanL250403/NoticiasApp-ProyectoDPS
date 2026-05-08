import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from '@react-navigation/native';
import { globalStyles } from "../../styles/globalStyles";
import axios from "axios";
import { useEffect, useState } from "react";
import { BannerTendencias } from "./components/BannerTendencias";
import { NoticiaCard } from "./components/NoticiaCard";
import { Cargando } from "../../components/Cargando";
export function Inicio() {
    const categoriasFetch = ['entertainment', 'business', 'technology', 'sports', 'science', 'health']
    const categoriasLista = ['Entretenimiento', 'Negocios', "Tecnología", "Deportes", "Ciencia", "Salud"]

    const [cargado, setCargado] = useState(false)
    const [trending, setTrending] = useState([])
    const [noticias, setNoticias] = useState([[]])

    async function obtenerNoticias() {
        const key = process.env.EXPO_PUBLIC_API_KEY
        try {
            const respuesta = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${key}`)
            setTrending(respuesta.data.articles)
        } catch (e) {
            console.log("error" + e)
        }

        let peticiones = []

        categoriasFetch.forEach((categoria) => {
            peticiones.push(axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&pageSize=5&apiKey=${key}`))
        })

        const respuestas = await Promise.all(peticiones)

        let notis = []

        respuestas.forEach((r) => {
            notis.push(r.data.articles)
        })

        setNoticias(notis)
        setCargado(true)
    }

    useEffect(() => {
        obtenerNoticias()
    }, [])

    if(!cargado){
        return(
            <Cargando></Cargando>
        )
    }
    return (
        <ScrollView style={styles.pantalla}>
            <BannerTendencias noticias={trending} />

            <View style={{ margin: 20, justifyContent: "center" }}>
                <TouchableOpacity>
                    <Link style={[globalStyles.botonOscuro]}>Nuestras fuentes</Link>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 20, justifyContent: "center" }}>
                <TouchableOpacity>
                    <Link style={[globalStyles.botonOscuro]}>Seguidos</Link>
                </TouchableOpacity>
            </View>
            
            {categoriasLista.map((categoria, index) => (
                <View key={index}>
                    <View style={styles.carrusel}>
                        <Text style={globalStyles.titulo}>{categoria}</Text>
                        <Link style={globalStyles.redirecciones}>
                            <Text>Ver más</Text>
                        </Link>
                    </View>
                    <ScrollView horizontal>
                        {noticias[index].map((noticia, index) => (
                            <NoticiaCard noticia={noticia} key={index} />
                        ))
                    }
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    carrusel: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10
    },
})