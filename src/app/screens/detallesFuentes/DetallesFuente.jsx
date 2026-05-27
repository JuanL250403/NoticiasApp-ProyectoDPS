import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colores } from "../../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
export default function DetallesFuente({ route }) {
    const { fuente } = route.params
    const [seguido, setSeguido] = useState(false)

    const verificarSeguido = async () => {
        const seguidos = await AsyncStorage.getItem('seguidos')
        if (!seguidos) {
            setSeguido(false)
            return
        }
        const seguidosJson = JSON.parse(seguidos)

        const existe = seguidosJson.filter((s) => s.id == fuente.id)
        if (existe.length > 0) {
            setSeguido(true)
        } else {
            setSeguido(false)
        }
    }

    const seguir = async () => {
        const seguidos = await AsyncStorage.getItem('seguidos')
        if (!seguidos) {
            await AsyncStorage.setItem('seguidos', JSON.stringify([fuente]))
            verificarSeguido()
            return
        }

        let seguidosJson = JSON.parse(seguidos)
        seguidosJson.push(fuente)
        await AsyncStorage.setItem('seguidos', JSON.stringify(seguidosJson))

        verificarSeguido()
    }

    const dejarDeSeguir = async () => {
        const seguidos = await AsyncStorage.getItem('seguidos')

        const seguidosJson = JSON.parse(seguidos)

        const actualizados = seguidosJson.filter((s) => s.id != fuente.id)
        
        await AsyncStorage.setItem('seguidos', JSON .stringify(actualizados))
        verificarSeguido()
    }

    useEffect(() => {
        verificarSeguido()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{fuente.name}</Text>
            <Text style={styles.categoria}>{fuente.category}</Text>
            <View style={styles.detalles}>
                <Text style={styles.extras}>Lenguaje: {fuente.language}</Text>
                <Text style={styles.extras}>País: {fuente.country}</Text>
            </View>
            <Text style={styles.descripcion}>{fuente.description}</Text>
            <TouchableOpacity style={styles.seguir}>
                {seguido ?
                    <Text style={styles.seguirTexto} onPress={() => dejarDeSeguir()}>Dejar de seguir</Text>
                    :
                    <Text style={styles.seguirTexto} onPress={() => seguir()}>Seguir</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: "white",
        padding: 25,
    },

    seguir: {
        marginTop: 35,
        backgroundColor: colores.Claro,
        height: 58,
        borderRadius: 18,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,

        elevation: 6
    },

    seguirTexto: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 0.5
    },

    categoria: {
        marginTop: 10,
        fontSize: 24,
        textAlign: 'center',
        color: colores.Claro,
        fontWeight: '600',
        textTransform: 'capitalize'
    },

    descripcion: {
        marginTop: 40,
        fontSize: 18,
        textAlign: 'justify',
        lineHeight: 32,
        color: "#444",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 3
    },

    detalles: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: "white",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 3
    },

    extras: {
        fontSize: 16,
        color: "#777",
        fontWeight: '500'
    },

    titulo: {
        textAlign: 'center',
        fontSize: 42,
        fontWeight: 'bold',
        color: "#1e1e1e",
        letterSpacing: 1,
        marginBottom: 5
    }
})