import AsyncStorage from "@react-native-async-storage/async-storage"
import { Cargando } from "../../components/Cargando"
import { NoiticiaCard } from "../guardados/components/NoticiaCard"
import { NoEncontrado } from "../../components/NoEncontrado"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { colores } from "../../styles/globalStyles"
import { globalStyles } from "../../styles/globalStyles"
import { BarraBusqueda } from "../../components/BarraBusqueda"
import { Paginacion } from "../../components/Paginacion"
import { newsApi } from "../../../../api"

export function Seguidos({ navigation }) {
    const [busqueda, setBusqueda] = useState()
    const [noticias, setNoticias] = useState([])
    const [noticiasPagina, setNoticiasPagina] = useState([])
    const [cargando, setCargando] = useState()
    const [pagina, setPagina] = useState(1)
    const [limitePaginas, setLimitePaginas] = useState()
    const [error, setError] = useState(false)

    const realizarBusqueda = async () => {
        if (!busqueda) {
            return
        }

        setCargando(true)
        const seguidos = await AsyncStorage.getItem('seguidos')

        if (!seguidos) {
            setCargando(false)
            return
        }

        const seguidosJson = JSON.parse(seguidos)

        const listado = seguidosJson.map((s) => {
            return s.id
        })

        console.log(listado.join(','))
        await newsApi.get(`/top-headlines`, {
            params: {
                q: busqueda,
                sources: listado.toString(),
            }
        })
            .then(res => {
                console.log(res.data.articles.length)
                setNoticias(res.data.articles)
                if (res.data.totalResults < 100) {
                    asignarLimitePaginas(res.data.articles.length)
                } else {
                    asignarLimitePaginas(100)
                }
                const paginaNot = res.data.articles.slice((pagina * 10) - 10, pagina * 10)
                setNoticiasPagina(paginaNot)
            })
            .catch(error => setError(true))
        setCargando(false)
    }

    const verDetalles = (articulo) => {
        navigation.navigate('detalles', { articulo })
    }

    const asignarLimitePaginas = (resultados) => {
        const limite = resultados / 10.0
        if (parseInt(limite) < limite) {
            setLimitePaginas(parseInt(limite) + 1)
        } else {
            setLimitePaginas(parseInt(limite))
        }
    }

    const limpiarBusqueda = () => {
        cargarNoticias()
        setBusqueda('')
    }

    const cargarNoticias = async () => {
        setCargando(true)
        const seguidos = await AsyncStorage.getItem('seguidos')

        if (!seguidos) {
            setCargando(false)
            return
        }

        const seguidosJson = JSON.parse(seguidos)

        const listado = seguidosJson.map((s) => {
            return s.id
        })

        console.log(listado.join(','))
        await newsApi.get(`/top-headlines`, {
            params: {
                sources: listado.toString(),
            }
        })
            .then(res => {
                console.log(res.data.articles.length)
                setNoticias(res.data.articles)
                if (res.data.totalResults < 100) {
                    asignarLimitePaginas(res.data.articles.length)
                } else {
                    asignarLimitePaginas(100)
                }
                const paginaNot = res.data.articles.slice((pagina * 10) - 10, pagina * 10)
                setNoticiasPagina(paginaNot)
            })
            .catch(error => setError(true))
        setCargando(false)
        setPagina(1)
    }


    useEffect(() => {
        navigation.addListener('focus', () => {
            cargarNoticias()
            setPagina(1)
            console.log(noticias.length)
        })
    }, [navigation])

    useEffect(() => {
        let paginaNot = []

        paginaNot = noticias.slice((pagina * 10) - 10, pagina * 10)
        setNoticiasPagina(paginaNot)
    }, [pagina])

    const recargar = () => {
        cargarNoticias()
    }

    if (error) {
        return (
            <Error recarga={recargar} />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={[styles.titulo, globalStyles.titulo]}>
                    De tus fuentes favoritas
                </Text>
                <View style={styles.top}>

                    <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} realizarBusqueda={realizarBusqueda} />
                    <TouchableOpacity onPress={() => limpiarBusqueda()}>
                        <Text style={[styles.borrar, globalStyles.botonOscuro]}>X</Text>
                    </TouchableOpacity>

                </View>


            </View>

            <View style={styles.scrollContainer}>
                {cargando ?
                    <Cargando />
                    :
                    noticiasPagina.length !== 0 ?
                        <ScrollView>

                            {/* NOTICIAS */}

                            {noticiasPagina.map((noticia, index) => (

                                <NoiticiaCard noticia={noticia} key={index} verDetalles={verDetalles} />

                            ))}


                        </ScrollView>
                        :
                        <NoEncontrado mensaje={`No se encontraron resultados`} />
                }
                {cargando || noticiasPagina.length == 0 ?
                    <></>
                    :
                    <Paginacion pagina={pagina} setPagina={setPagina} limite={limitePaginas} />
                }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    borrar: {
        fontSize: 18,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        flex: 3,
    },
    header: {
        flex: 1
    },
    vacioText: {
        fontSize: 22,
    },
    titulo: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 20,
    },
    top: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})