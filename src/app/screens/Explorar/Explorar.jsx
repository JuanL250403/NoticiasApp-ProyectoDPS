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
export function Explorar({ navigation, route }) {
    const [busqueda, setBusqueda] = useState()
    const [noticias, setNoticias] = useState([])
    const [noticiasPagina, setNoticiasPagina] = useState([])
    const [cargando, setCargando] = useState()
    const [pagina, setPagina] = useState(1)
    const [limitePaginas, setLimitePaginas] = useState()
    const [error, setError] = useState(false)

    const lenguaje = route?.params?.lenguaje || null
    const categoria = route?.params?.categoria || null
    const fechaDesde = route?.params?.fechaDesde || null
    const fechaHasta = route?.params?.fechaHasta || null

    useEffect(() => {
        if (lenguaje && categoria && fechaDesde && fechaHasta ) {          
            console.log("filtros" + lenguaje + categoria + fechaDesde + fechaHasta)
            aplicarFiltros()
        } else {
            cargarNoticias()
        }
    }, [])

    useEffect(() => {
        let paginaNot = []

        paginaNot = noticias.slice((pagina * 10) - 10, pagina * 10)
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
        await newsApi.get(`/top-headlines`, {
            params: {
                category: "general",
                pageSize: 100,
            }
        })
            .then(res => {
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

    const asignarLimitePaginas = (resultados) => {
        const limite = parseInt(resultados / 10)
        setLimitePaginas(limite)
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

        console.log(filtros)

        await newsApi.get(`/everything`, {

            params: {
                ...filtros,
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

    if (error) {
        return (
            <Error recarga={recargar} />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.titulo, globalStyles.titulo]}>
                Explorar Noticias
            </Text>

            {/* BUSQUEDA + FILTRO */}

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

            {cargando ?
                <Cargando />
                :
                noticiasPagina.length !== 0 ?
                    <ScrollView>

                        {/* NOTICIAS */}

                        {noticiasPagina.map((noticia, index) => (

                            <NoiticiaCard noticia={noticia} key={index} />

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
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    vacioContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    vacioText: {
        fontSize: 22,
    },
    titulo: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 20
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})