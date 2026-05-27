import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from '@react-navigation/native';
import { globalStyles } from "../../styles/globalStyles";
import axios from "axios";
import { useEffect, useState } from "react";
import { BannerTendencias } from "./components/BannerTendencias";
import { NoticiaCard } from "./components/NoticiaCard";
import { Cargando } from "../../components/Cargando";
import { newsApi } from "../../../../api";
import { Error } from "../../components/Error";
import { useNavigation } from "@react-navigation/native";
import { TabActions } from "@react-navigation/native";
import { useConfig } from "../Context/ConfigContext";

export function Inicio({ navigation }) {

    const categoriasFetch = ['entertainment', 'business', 'technology', 'sports', 'science', 'health']
    const categoriasLista = ['Entretenimiento', 'Negocios', "Tecnología", "Deportes", "Ciencia", "Salud"]

    const [cargado, setCargado] = useState(false)
    const [trending, setTrending] = useState([])
    const [noticias, setNoticias] = useState([[]])
    const [error, setError] = useState(false)

    const verDetalles = (articulo) => {
        navigation.navigate('detalles', { articulo })
    }

    useEffect(() => {

    }, []);

    async function obtenerNoticias() {

        await newsApi.get(`/top-headlines`, {
            params: {
                country: "us",
                pageSize: 5,
            }
        }).then(res => setTrending(res.data.articles))
            .catch(error => setError(true))


        let peticiones = []

        categoriasFetch.forEach((categoria) => {
            peticiones.push(
                newsApi.get(`/top-headlines`, {
                    params: {
                        country: "us",
                        category: categoria,
                        pageSize: 5
                    }
                })
                    .catch(error => setError(true)))
        })

        const respuestas = await Promise.all(peticiones)

        let notis = []

        respuestas.forEach((r) => {
            notis.push(r.data.articles)
        })

        setNoticias(notis)
        setCargado(true)
    }

    const recargar = () => {
        setError(false)
        obtenerNoticias()
    }
    useEffect(() => {
        obtenerNoticias()
    }, [])

    if (error) {
        return (
            <Error recarga={recargar} />
        )
    }

    if (!cargado) {
        return (
            <Cargando></Cargando>
        )
    }

    return (
        <ScrollView style={styles.pantalla}>
            <BannerTendencias noticias={trending} />

            <View style={{ margin: 20, justifyContent: "center" }}>

                <TouchableOpacity onPress={() => navigation.navigate("Fuentes")}>

                    <Text style={[globalStyles.botonOscuro]}>Nuestras fuentes</Text>
                </TouchableOpacity>

            </View>

            <View style={{ margin: 20, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Seguidos")}>
                    <Text style={[globalStyles.botonOscuro]}>Seguidos</Text>
                </TouchableOpacity>
            </View>

            {categoriasLista.map((categoria, index) => (
                <View key={index}>
                    <View style={styles.carrusel}>
                        <Text style={globalStyles.titulo}>{categoria}</Text>
                    </View>
                    <ScrollView horizontal>
                        {noticias[index].map((noticia, index) => (
                            <NoticiaCard noticia={noticia} key={index} verDetalles={verDetalles} />
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