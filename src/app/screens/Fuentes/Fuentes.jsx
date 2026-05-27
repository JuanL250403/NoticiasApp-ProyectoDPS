import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { NoEncontrado } from "../../components/NoEncontrado";
import { Cargando } from "../../components/Cargando";
import { BarraBusqueda } from "../../components/BarraBusqueda";
import { useState, useEffect } from "react";
import { newsApi } from "../../../../api";
import { Paginacion } from "../../components/Paginacion";
import { FuenteCard } from "./components/FuenteCard";
import { Filtro } from "../../components/Filtro";
import { useConfig } from "../Context/ConfigContext";

export function Fuentes({ navigation, route }) {
    const {idioma} = useConfig()

    const [busqueda, setBusqueda] = useState()
    const [fuentes, setFuentes] = useState([])
    const [fuentesPagina, setFuentesPagina] = useState([])
    const [cargando, setCargando] = useState()
    const [pagina, setPagina] = useState(1)
    const [limitePaginas, setLimitePaginas] = useState()
    const [error, setError] = useState(false)


    const lenguaje = route?.params?.lenguaje || null
    const categoria = route?.params?.categoria || null

    const realizarBusqueda = async () => {
        setCargando(true)
        await newsApi.get(`/top-headlines/sources`)
            .then(res => {
                setPagina(1)
                const filtradas = res.data.sources.filter((f) => f.name.includes(busqueda))

                if (filtradas.length < 100) {
                    asignarLimitePaginas(filtradas.length)
                } else {
                    asignarLimitePaginas(100)
                }

                console.log(filtradas.length)

                const paginaNot = filtradas.slice((pagina * 10) - 10, pagina * 10)
                setFuentes(filtradas)
                setFuentesPagina(paginaNot)
            })
            .catch(error => setError(true))
        setCargando(false)
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
        cargarFuentes()
        setBusqueda('')
    }

    const cargarFuentes = async () => {
        setCargando(true)
        await newsApi.get(`/top-headlines/sources`)
            .then(res => {
                setFuentes(res.data.sources)
                if (res.data.totalResults < 100) {
                    asignarLimitePaginas(res.data.sources.length)
                } else {
                    asignarLimitePaginas(100)
                }
                const paginaNot = res.data.sources.slice((pagina * 10) - 10, pagina * 10)
                setFuentesPagina(paginaNot)
            })
            .catch(error => setError(true))
        setCargando(false)
    }

    useEffect(() => {
        let paginaNot = []

        paginaNot = fuentes.slice((pagina * 10) - 10, pagina * 10)
        setFuentesPagina(paginaNot)
    }, [pagina])

    const aplicarFiltros = async () => {
        setCargando(true)

        let filtros = {};
        if (lenguaje && categoria) {
            filtros = {
                language: lenguaje,
                category: categoria
            }
        } else if (lenguaje) {
            filtros = {
                language: lenguaje
            }
        }

        await newsApi.get('/top-headlines/sources', {
            params: {
                ...filtros
            }
        }
        )
            .then((res) => {
                setFuentes(res.data.sources)
                console.log(res.data.sources.length)

                if (res.data.sources.length < 100) {
                    asignarLimitePaginas(res.data.sources.length)
                } else {
                    asignarLimitePaginas(100)
                }

                const paginaNot = res.data.sources.slice((pagina * 10) - 10, pagina * 10)
                setFuentesPagina(paginaNot)
            })
            .catch(error => console.log(error))
        setCargando(false)
    }

    useEffect(() => {
        if (lenguaje && categoria) {
            aplicarFiltros()
        } else {
            cargarFuentes()
        }
    }, [])

    const verDetalles = (fuente) => {
        navigation.navigate("Detalles", { fuente })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={[styles.titulo, globalStyles.titulo]}>
                    Nuestras fuentes
                </Text>
                <View style={styles.top}>

                    <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} realizarBusqueda={realizarBusqueda} />

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Filtros")}
                    >
                        <Filtro />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => limpiarBusqueda()}>
                    <Text style={styles.borrar, globalStyles.botonOscuro}>Borrar filtros</Text>
                </TouchableOpacity>


            </View>

            <View style={styles.scrollContainer}>
                {cargando ?
                    <Cargando />
                    :
                    fuentesPagina.length !== 0 ?
                        <ScrollView>


                            {fuentesPagina.map((fuente, index) => (

                                <FuenteCard key={index} fuente={fuente} verDetalles={verDetalles} />
                            ))}


                        </ScrollView>
                        :
                        <NoEncontrado mensaje={`No se encontraron resultados`} />
                }
                {cargando || fuentesPagina.length == 0 ?
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