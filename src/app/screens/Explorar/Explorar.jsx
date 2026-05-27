import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { BarraBusqueda } from "../../components/BarraBusqueda";
import { globalStyles } from "../../styles/globalStyles";
import { Filtro } from "../../components/Filtro";
import { colores } from "../../styles/globalStyles";
import { useEffect, useState } from "react";
import { NoiticiaCard } from "./components/NoticiaCard";
import { newsApi } from "../../../../api";
import { Cargando } from "../../components/Cargando";
import { Paginacion } from "../../components/Paginacion";
import { Recargar } from "../../components/Recargar";
import { Error } from "../../components/Error";
import { NoEncontrado } from "../../components/NoEncontrado";
import { useConfig } from "../Context/ConfigContext";

export function Explorar({ navigation, route }) {
    const { idioma } = useConfig()

    const [busqueda, setBusqueda] = useState()
    const [noticias, setNoticias] = useState([])
    const [noticiasPagina, setNoticiasPagina] = useState([])
    const [cargando, setCargando] = useState()
    const [pagina, setPagina] = useState(1)
    const [limitePaginas, setLimitePaginas] = useState()
    const [error, setError] = useState(false)

    const lenguaje = route?.params?.lenguaje || idioma
    const categoria = route?.params?.categoria || idioma ? 'general' : null
    const fechaDesde = route?.params?.fechaDesde || null
    const fechaHasta = route?.params?.fechaHasta || null

    useEffect(() => {
        if (lenguaje) {
            aplicarFiltros()
            return
        }
        else if (lenguaje && categoria && fechaDesde && fechaHasta) {
            console.log("filtros" + lenguaje + categoria + fechaDesde + fechaHasta)
            aplicarFiltros()
            return
        } else {
            cargarNoticias()
        }
    }, [idioma])

    useEffect(() => {
        let paginaNot = []

        paginaNot = noticias.slice(pagina * 10 - 10, pagina * 10)
        setNoticiasPagina(paginaNot)
    }, [pagina])


    const datosDefault = async () => {
        setBusqueda(null)
        setCargando(false)
        setLimitePaginas(null)
        setNoticiasPagina([])
        setNoticias([])

        await cargarNoticias()

        setPagina(1)
    }

    const cargarNoticias = async () => {
        setCargando(true)
        await newsApi.get(`/everything`, {
            params: {
                q: 'general',
                language: idioma ?? null,
                sortBy: 'relevancy',
                pageSize: 100,
            }
        })
            .then(res => {
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

    const asignarLimitePaginas = (resultados) => {
        const limite = resultados / 10
        if (limite > parseInt(limite)) {
            setLimitePaginas(parseInt(limite) + 1)
        } else {
            setLimitePaginas(parseInt(limite))
        }
    }

    const recargar = async () => {
        await datosDefault()
        setError(false)
    }

    const aplicarFiltros = async () => {
        setCargando(true)

        let filtros = {};
        if (fechaDesde && fechaHasta && lenguaje && categoria) {
            filtros = {
                language: lenguaje,
                q: categoria,
                from: fechaDesde,
                to: fechaHasta
            }
        }
        else if (lenguaje && categoria) {
            filtros = {
                language: lenguaje,
                q: categoria
            }
        } else if (lenguaje) {
            filtros = {
                language: lenguaje
            }
        }

        await newsApi.get(`/everything`, {

            params: {
                ...filtros,
            }
        }
        )
            .then((res) => {
                console.log(res.data)
                setNoticias(res.data.articles)
                if (res.data.totalResults < 100) {
                    asignarLimitePaginas(res.data.articles.length)
                } else {
                    asignarLimitePaginas(100)
                }
                const paginaNot = res.data.articles.slice((pagina * 10) - 10, pagina * 10)
                setNoticiasPagina(paginaNot)
            })
            .catch(error => console.log(error.response.data))
        setCargando(false)
    }

    const realizarBusqueda = async () => {
        if (!busqueda) {
            return
        }

        setCargando(true)
        setPagina(1)


        let filtros = {
            q: busqueda,
            search: 'title'
        }


        await newsApi.get(`/everything`, {
            params: {
                ...filtros,
                language: idioma ?? null
            }
        }
        )
            .then((res) => {
                setNoticias(res.data.articles)
                if (res.data.totalResults < 100) {
                    asignarLimitePaginas(res.data.totalResults)
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

    if (error) {
        return (
            <Error recarga={recargar} />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={[styles.titulo, globalStyles.titulo]}>
                    Explorar
                </Text>
                <View style={styles.top}>

                    <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} realizarBusqueda={realizarBusqueda} />

                    <TouchableOpacity
                        onPress={() => navigation.navigate("filtros")}
                    >
                        <Filtro />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => datosDefault()}>
                    <Text style={styles.borrar, globalStyles.botonOscuro}>Borrar filtros</Text>
                </TouchableOpacity>


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