
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, Touchable, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { NoImagen } from "../../components/NoImagen";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useConfig } from "../Context/ConfigContext";

export function detalleArticulo({ route }) {
    const { fuente } = useConfig()
    const { articulo } = route.params
    const [guardada, setGuardada] = useState(false)

    const abrirWeb = async () => {
        await Linking.openURL(articulo.url)
    }

    const guardar = async () => {
        const guardados = await AsyncStorage.getItem('guardados');
        if (!guardados) {
            await AsyncStorage.setItem('guardados', JSON.stringify([articulo]))
        } else {
            let g = JSON.parse(guardados)
            g.push(articulo)
            console.log(g)
            await AsyncStorage.setItem('guardados', JSON.stringify(g))
        }
        verificarGuardad()
    }

    const eliminar = async () => {
        const guardados = await AsyncStorage.getItem('guardados');

        const guardadosJsn = JSON.parse(guardados)
        const eliminados = guardadosJsn.filter((g) => g.title !== articulo.title)
        await AsyncStorage.setItem('guardados', JSON.stringify(eliminados))
        verificarGuardad()
    }

    const verificarGuardad = async () => {
        const guardados = await AsyncStorage.getItem('guardados')
        

        if (!guardados) {
            setGuardada(false)
            return
        }

        const guardJson = JSON.parse(guardados);
        const existe = guardJson.filter((g) => g.title === articulo.title)
        console.log(existe)

        if (existe.length > 0) {

            setGuardada(true)
            return
        }

        setGuardada(false)
    }

    useEffect(() => {
        console.log(fuente)
        verificarGuardad()
    })

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <View>
                    {articulo.urlToImage ?
                        <Image source={{ uri: articulo.urlToImage }} style={[styles.img]} />
                        :
                        <NoImagen />
                    }
                </View>
                <TouchableOpacity onPress={() => abrirWeb()} style={styles.web}>
                    <Image
                        source={require("../../../../assets/iconos/web.png")}
                        style={{
                            height: 50,
                            width: 50
                        }}
                    />
                </TouchableOpacity>
                {
                    !guardada ?

                        <TouchableOpacity onPress={() => guardar()} style={styles.guardar}>
                            <Image
                                style={{
                                    height: 45,
                                    width: 45
                                }}
                                source={require("../../../../assets/iconos/guardar.png")}

                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => eliminar()} style={styles.guardar}>
                            <Image
                                style={{
                                    height: 45,
                                    width: 45
                                }}
                                source={require("../../../../assets/iconos/guardada.png")}

                            />
                        </TouchableOpacity>
                }
            </View>
            <View style={styles.scroll}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, globalStyles.titulo]}>{articulo.title}</Text>
                    <Text style={[styles.datos, globalStyles.subTitulo]}>Por {articulo.author ?? 'desconocido'} desde {articulo.source.name ?? 'desconocido'}</Text>
                    <Text style={[styles.datos, globalStyles.subTitulo]}>Publicado el {new Date(articulo.publishedAt).toLocaleString()}</Text>
                    <Text style={[styles.contenido, { fontSize: Number(fuente) }]}>{articulo.content ?? articulo.description}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },

    web: {
        height: 55,
        width: 55,
        position: 'absolute',
        zIndex: 999,
        bottom: 15,
        left: 15,
        borderRadius: 999,
        backgroundColor: '#ffffffdd',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,

        elevation: 8
    },

    guardar: {
        height: 50,
        width: 50,
        position: 'absolute',
        zIndex: 999,
        bottom: 15,
        right: 15,
        borderRadius: 999,
        backgroundColor: '#ffffffdd',

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,

        elevation: 8
    },

    title: {
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        color: '#1e1e1e',
        letterSpacing: 0.5
    },

    datos: {
        marginVertical: 6,
        fontSize: 17,
        color: '#444',
        lineHeight: 25
    },

    contenido: {
        marginTop: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 25,
        padding: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,

        elevation: 4
    },

    imgContainer: {
        flex: 4,
        overflow: 'hidden',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    img: {
        height: '100%',
        width: '100%',
    },

    scroll: {
        flex: 6,
        paddingLeft: 15,
        paddingRight: 15,
    }
})